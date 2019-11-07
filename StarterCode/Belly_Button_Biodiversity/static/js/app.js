function buildMetadata(sample) {

    // @TODO: Complete the following function that builds the metadata panel

    // Use `d3.json` to fetch the metadata for a sample
    //=========================================================================
    var diversity_dashboard = `/metadata/${sample}`;
    // Use d3 to select the panel with id of `#sample-metadata`
    //=========================================================================
    d3.json(diversity_dashboard).then(function(response) {
        var belly_data = response;

    });
}

function buildCharts(sample) {

    // @TODO: Use `d3.json` to fetch the sample data for the plots
    //=========================================================================
    var diversity_dashboard = `/samples/${sample}`;
    d3.json(diversity_dashboard).then(function(response) {
        var x_value = response["otu_ids"];
        var y_value = response["sample_values"];
        var bubble_size = response["sample_values"];
        var label = response["otu_labels"];
        // @TODO: Build a Bubble Chart using the sample data
        //=========================================================================
        var data_list = {
            x: x_value,
            y: y_value,
            mode: "markers",
            marker: {
                size: bubble_size,
                color: x_value,
                colorscale: "blue",
                labels: label,
                type: 'scatter',
                opacity: 0.5
            }
        };

        var diversity_data = [data_list];

        var layout = {
            title: 'Belly Button Biodiversity Bubble Chart',
            xaxis: { title: 'OTU ID' },
            showlegend: true
        };
        Plotly.newPlot("bubble", diversity_data, layout);
        // @TODO: Build a Pie Chart
        //=========================================================================
        // HINT: You will need to use slice() to grab the top 10 sample_values,
        //=========================================================================
        // otu_ids, and labels (12 each).
        //=========================================================================
        var belly_data = [{
            values: bubble_size.splice(0, 12),
            labels: x_value.splice(0, 12),
            text: y_value.splice(0, 12),
            type: 'pie'

        }];
        Plotly.newPlot('pie', belly_data);
    });
}

function init() {
    // Grab a reference to the dropdown select element
    //=========================================================================
    var selector = d3.select("#selDataset");

    // Use the list of sample names to populate the select options
    //=========================================================================
    d3.json("/names").then((sampleNames) => {
        sampleNames.forEach((sample) => {
            selector
                .append("option")
                .text(sample)
                .property("value", sample);
        });

        // Use the first sample from the list to build the initial plots
        //=========================================================================
        const firstSample = sampleNames[0];
        buildCharts(firstSample);
        buildMetadata(firstSample);
    });
}

function optionChanged(newSample) {
    // Fetch new data each time a new sample is selected
    //=========================================================================
    buildCharts(newSample);
    buildMetadata(newSample);

    // Initialize the dashboard
    //=========================================================================
}

init();