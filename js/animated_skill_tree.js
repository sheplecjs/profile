async function chartSkill() {

    // grab data for the graph
    const data = await d3.json("../data/skill.json")

    // set margins
    const margin = ({ top: 10, right: 120, bottom: 10, left: 40 })

    // width based on parent element at load time
    const width = document.getElementById("menu-div").clientWidth * 0.65

    // 2 branches
    const dy = width / 2.95

    // vertical space between nodes
    const dx = 25

    // define node size
    const tree = d3.tree().nodeSize([dx, dy])

    // tree structure
    const diagonal = d3.linkHorizontal().x(d => d.y).y(d => d.x)
    const root = d3.hierarchy(data);
    const HideOnLoad = ["Web", "ML/AI", "Other"]
    root.x0 = dy / 2;
    root.y0 = 0;
    root.descendants().forEach((d, i) => {
      d.id = i;
      d._children = d.children;
      if (HideOnLoad.indexOf(d.data.name) != -1) d.children = null;
    });

    const svg = d3.select("#skill-tree")
      .attr("viewBox", [-margin.left, -margin.top, width, dx])
      .style("font", "14px sans-serif")
      .style("user-select", "none");

    const gLink = svg.append("g")
      .attr("fill", "none")
      .attr("stroke", "#555")
      .attr("stroke-opacity", 0.4)
      .attr("stroke-width", 1.5);

    const gNode = svg.append("g")
      .attr("cursor", "pointer")
      .attr("pointer-events", "all");

    function update(source) {
      const duration = d3.event && d3.event.altKey ? 250 : 175;
      const nodes = root.descendants().reverse();
      const links = root.links();

      // Compute the new tree layout.
      tree(root);

      let left = root;
      let right = root;
      root.eachBefore(node => {
        if (node.x < left.x) left = node;
        if (node.x > right.x) right = node;
      });

      const height = right.x - left.x + margin.top + margin.bottom;

      const transition = svg.transition()
        .duration(duration)
        .attr("viewBox", [-margin.left, left.x - margin.top, width, height])
        .tween("resize", window.ResizeObserver ? null : () => () => svg.dispatch("toggle"));

      // Update the nodes…
      const node = gNode.selectAll("g")
        .data(nodes, d => d.id);

      // Enter any new nodes at the parent's previous position.
      const nodeEnter = node.enter().append("g")
        .attr("transform", d => `translate(${source.y0},${source.x0})`)
        .attr("fill-opacity", 0)
        .attr("stroke-opacity", 0)
        .on("click", (event, d) => {
          d.children = d.children ? null : d._children;
          update(d);
        });



      nodeEnter.append("polygon")
        .attr("points", d => d.data.points)
        // .attr("fill",  d => d.data.color_code)
        .attr("stroke-width", 10);

      nodeEnter.append("rect")
        .attr("x", -5)
        .attr("y", -5)
        .attr("width", 10)
        .attr("height", 10)
        .style("fill", d => d.data.color_code);



      nodeEnter.append("text")
        .attr("dy", "0.31em")
        .attr("x", d => d._children ? -6 : 6)
        .attr("text-anchor", d => d._children ? "end" : "start")
        .text(d => d.data.name)
        .attr("class", d => d.data.class)
        .on("mouseover", (event, d) => {
          d3.selectAll(d.data.projects_selector).attr("style", "background-color: #c76748;");
        })
        .on("mouseleave", (event, d) => {
          d3.selectAll(d.data.projects_selector).attr("style", "background-color: ;")
        })
        .clone(true).lower()
        .attr("stroke-linejoin", "round")
        .attr("stroke-width", 3)
        .attr("stroke", "white");

      // Transition nodes to their new position.
      const nodeUpdate = node.merge(nodeEnter).transition(transition)
        .attr("transform", d => `translate(${d.y},${d.x})`)
        .attr("fill-opacity", 1)
        .attr("stroke-opacity", 1);

      // Transition exiting nodes to the parent's new position.
      const nodeExit = node.exit().transition(transition).remove()
        .attr("transform", d => `translate(${source.y},${source.x})`)
        .attr("fill-opacity", 0)
        .attr("stroke-opacity", 0);

      // Update the links…
      const link = gLink.selectAll("path")
        .data(links, d => d.target.id);

      // Enter any new links at the parent's previous position.
      const linkEnter = link.enter().append("path")
        .attr("d", d => {
          const o = { x: source.x0, y: source.y0 };
          return diagonal({ source: o, target: o });
        });

      // Transition links to their new position.
      link.merge(linkEnter).transition(transition)
        .attr("d", diagonal);

      // Transition exiting nodes to the parent's new position.
      link.exit().transition(transition).remove()
        .attr("d", d => {
          const o = { x: source.x, y: source.y };
          return diagonal({ source: o, target: o });
        });

      // Stash the old positions for transition.
      root.eachBefore(d => {
        d.x0 = d.x;
        d.y0 = d.y;
      });
    }

    update(root);

    function createLegendPoint(color, text, x, y) {
      legend = d3.select("#legend");

      let lPoint = legend.append("g");

      lPoint.append("rect")
        .attr("x", x)
        .attr("y", y)
        .attr("width", 10)
        .attr("height", 10)
        .style("fill", color);

      lPoint.append("text")
        .attr("x", x + 20)
        .attr("y", y + 5)
        .text(text)
        .style("font-size", "12px")
        .attr("alignment-baseline", "middle");
    }

    // "#b30000", "#7c1158", "#4421af", "#1a53ff", "#0d88e6" - new scheme
    // "#e60049", "#0bb4ff", "#50e991", "#e6d800", "#9b19f5"

    createLegendPoint("#e60049", "Python", 10, 5)
    createLegendPoint("#0bb4ff", "Javascript", 100, 5)
    createLegendPoint("#50e991", "Low/No-code", 200, 5)
    createLegendPoint("#e6d800", "SQL", 320, 5)
    createLegendPoint("#ff9900", "Rust", 10, 25)
    createLegendPoint("#9b19f5", "CLI/Service", 390, 5)

    return svg.node();
  }

  window.onload = chartSkill()