<template>
<p>arc chart</p>
<div id="my_dataviz"></div>
</template>

<script>
import * as d3 from 'd3';
import { onMounted } from '@vue/runtime-core';

export default {
    setup() {

        let svg = null;
        const margin = {
            top: 20,
            right: 30,
            bottom: 20,
            left: 30
        };

        onMounted(() => {

        //TODO: get this from parent div of svg
        const width = 950 - margin.left - margin.right;
        const height = 300 - margin.top - margin.bottom;

        svg = d3.select("#my_dataviz")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);
        
        console.log(svg);

        d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_network.json").then(function (data) {

            // List of node names
            const allNodes = data.nodes.map(d => d.name);

            // A linear scale to position the nodes on the X axis
            const x = d3.scalePoint()
                .range([0, width])
                .domain(allNodes);

            // Add the circle for the nodes
            const nodes = svg
                .selectAll("mynodes")
                .data(data.nodes)
                .join("circle")
                .attr("cx", d => x(d.name))
                .attr("cy", height - 30)
                .attr("r", 8)
                .style("fill", "#69b3a2")

            // And give them a label
            const labels = svg
                .selectAll("mylabels")
                .data(data.nodes)
                .join("text")
                .attr("x", d => x(d.name))
                .attr("y", height - 10)
                .text(d => (d.name))
                .style("text-anchor", "middle");

            console.log(labels);

            // Add links between nodes. Here is the tricky part.
            // In my input data, links are provided between nodes -id-, NOT between node names.
            // So I have to do a link between this id and the name
            const idToNode = {};
            data.nodes.forEach(function (n) {
                idToNode[n.id] = n;
            });
            // Cool, now if I do idToNode["2"].name I've got the name of the node with id 2

            // Add the links
            const links = svg
                .selectAll('mylinks')
                .data(data.links)
                .join('path')
                .attr('d', d => {
                    let start = x(idToNode[d.source].name) // X position of start node on the X axis
                    let end = x(idToNode[d.target].name) // X position of end node
                    return ['M', start, height - 30, // the arc starts at the coordinate x=start, y=height-30 (where the starting node is)
                            'A', // This means we're gonna build an elliptical arc
                            (start - end) / 2, ',', // Next 2 lines are the coordinates of the inflexion point. Height of this point is proportional with start - end distance
                            (start - end) / 2, 0, 0, ',',
                            start < end ? 1 : 0, end, ',', height - 30
                        ] // We always want the arc on top. So if end is before start, putting 0 here turn the arc upside down.
                        .join(' ');
                })
                .style("fill", "none")
                .attr("stroke", "black");

            // Add the highlighting functionality
            nodes
                .on('mouseover', function (event, d) {
                    // Highlight the nodes: every node is green except of him
                    nodes.style('fill', "#B8B8B8")
                    d3.select(this).style('fill', '#69b3b2')
                    // Highlight the connections
                    links
                        .style('stroke', a => a.source === d.id || a.target === d.id ? '#69b3b2' : '#b8b8b8')
                        .style('stroke-width', a => a.source === d.id || a.target === d.id ? 4 : 1)
                })
                .on('mouseout', () => {
                    nodes.style('fill', "#69b3a2");
                    links
                      .style('stroke', 'black')
                      .style('stroke-width', '1');
                  });

            // text hover nodes
            svg
                .append("text")
                .attr("text-anchor", "middle")
                .style("fill", "#B8B8B8")
                .style("font-size", "17px")
                .attr("x", 50)
                .attr("y", 10)
                .html("Hover nodes")

        })
        })

        return {
            svg,
        };

    },
}
</script>
