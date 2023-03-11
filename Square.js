/////////////////////////////////////////////////////////////////////////////
//
//  Square.js
//

function Square(gl, vertexShader, fragmentShader) {

    vertexShader ||= "Square-vertex-shader";
    fragmentShader ||= "Square-fragment-shader";

    let program = initShaders(gl, vertexShader, fragmentShader);

    // Set up our data:
    //   - positions contains our vertex positions
    //   - indices contains how to organize the vertices
    //       into primitives
    //
    let positions = [
        0.0, 0.0, 0.0,  // Vertex 0
        1.0, 0.0, 0.0,// Vertex 1
        0.0, 1.0, 0.0, // Vertex 2
        1.0, 1.0, 0.0,  // Vertex 3
        0.0, 0.0, 1.0, // Vertex 4
        1.0, 0.0, 1.0,  // Vertex 5
        0.0, 1.0, 1.0,  // Vertex 6
        1.0, 1.0, 1.0 // vertex7
    ];

    let indices = [
        1,2,0,//4 sides
        1,3,2,
        1,5,3,
        3,5,7,
        7,5,4,
        4,6,7,
        4,0,6,
        0,2,6,

        2,3,6,//top
        6,3,7,

        0,4,1,//bottom
        1,4,5


    ];

    // Initialize all of our WebGL "plumbing" variables
    //
    let aPosition = new Attribute(gl, program, positions,
        "aPosition", 3, gl.FLOAT);

    indices = new Indices(gl, indices);

    let MV = new Uniform(gl, program, "MV");
    let P  = new Uniform(gl, program, "P");

    this.render = () => {
        gl.useProgram(program);

        aPosition.enable();
        indices.enable();

        MV.update(this.MV);
        P.update(this.P);

        gl.drawElements(gl.TRIANGLES, indices.count, indices.type, 0);

        indices.disable();
        aPosition.disable();

    };
};
