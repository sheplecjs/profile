async function chartTimeline() {

    // define margins
    let margin = ({ top: 30, right: 30, bottom: 30, left: 30 })

    // get height and width of parent div at load time
    const width = document.getElementById("menu-div").clientWidth * 0.65
    const height = Math.ceil(width / 2)

    // parse and group data
    const data = await d3.csv("../data/cv.csv")
    const locations = d3.group(data, d => d.location)

    // unique locations
    let countries = new Set()
    data.forEach(d => countries.add(d.country))
    const country = Array.from(countries)

    // we'll allow float for dates to express monthly resolution, 
    // but format it out for display
    let formatDate = d => `${Math.trunc(d)}`

    let y = d3.scaleBand()
      .domain(country)
      .range([0, height - margin.bottom - margin.top])
      .padding(0.2)

    let x = d3.scaleLinear()
      .domain([d3.min(data, d => d.start), d3.max(data, d => d.end)])
      .range([0, width - margin.left - margin.right])

    // funcs for creating tooltips
    function getTooltipContent(d) {
      return `<b>${d.activity}</b>
                    <br/>
                    <b style="color:${d => d.color.darker()}">${d.location}</b>
                    <br/>
                    ${formatDate(d.start)} - ${formatDate(d.end)}
                    </br>
                    ${d.description}
                    `
    }

    function createTooltip(el) {
      el.style("position", "absolute")
        .style("pointer-events", "none")
        .style("top", 0)
        .style("opacity", 0)
        .style("background", "white")
        .style("border-radius", "5px")
        .style("box-shadow", "0 0 10px rgba(0,0,0,.25)")
        .style("padding", "10px")
        .style("line-height", "1.3")
        .style("font", "11px sans-serif")
        .attr("class", "tooltip");
    }

    function getRect(d) {
      const el = d3.select(this);
      const sx = x(Number(d.start));
      const w = x(Number(d.end)) - x(Number(d.start));

      el.style("cursor", "pointer")

      el.append("rect")
        .attr("x", sx)
        .attr("height", 45)
        .attr("width", w)
        .attr("fill", d.color)
        .attr("rx", "3")
        .attr("class", "timeline-rect");

      if (w > 35) {
        el.append("text")
          .text(d.short_label)
          .attr("x", sx + w / 2)
          .attr("y", 20.5)
          .attr("fill", "black")
          .style("font-size", "10")
          .style("text-anchor", "middle")
          .style("dominant-baseline", "hanging");
      }
    }

    let axisTop = d3.axisTop()
      .scale(x)
      .tickFormat(formatDate)
      .tickPadding(2);

    let axisBottom = d3.axisBottom()
      .scale(x)
      .tickFormat(formatDate)
      .tickPadding(2);



    let filteredData = data.sort((a, b) => a.start - b.start);

    filteredData.forEach(d => d.color = d3.color(d.color_code))

    const parent = document.getElementById("timeline-parent")
    const svg = d3.select("#timeline");

    svg.attr("width", width).attr("height", height)

    const g = svg.append("g").attr("transform", (d, i) => `translate(${margin.left} ${margin.top})`);

    const groups = g
      .selectAll("g")
      .data(filteredData)
      .enter()
      .append("g")
      .attr("class", "act")


    const tooltip = d3.select(document.createElement("div")).call(createTooltip);

    const line = svg.append("line").attr("y1", margin.top - 10).attr("y2", height - margin.bottom).attr("stroke", "rgba(0,0,0,0.2)").style("pointer-events", "none");

    groups.attr("transform", (d) => `translate(0 ${y(d.country)})`)

    // draw bars
    groups
      .each(getRect)
      .on("mouseover", (event, d) => {
        d3.select(this.rect).attr("fill", d => d.color.darker())

        tooltip
          .style("opacity", 1)
          .html(getTooltipContent(d))
      })
      .on("mouseleave", (event, d) => {
        d3.select(this.rect).attr("fill", d => d.color)

        tooltip
          .style("opacity", 0)
      })

    svg
      .append("g")
      .attr("transform", (d, i) => `translate(${margin.left} ${margin.top - 10})`)
      .call(axisTop)

    svg
      .append("g")
      .attr("transform", (d, i) => `translate(${margin.left} ${height - margin.bottom})`)
      .call(axisBottom)



    svg.on("mousemove", function (d) {

      let [x, y] = d3.pointer(d);
      line.attr("transform", `translate(${x} 0)`);
      y += 20;
      if (x > width / 2) x -= 100;

      tooltip
        .style("left", x + "px")
        .style("top", y + "px")
    })

    parent.appendChild(svg.node());
    parent.appendChild(tooltip.node());
    parent.groups = groups;

  }

   window.onload = chartTimeline();