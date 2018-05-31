import React from "react";
import { RingLoader } from "react-spinners";

const Spinner = () => (
	<div style={{ margin: "100px auto", width: "200px" }}>
		<RingLoader size={200} color="#80CBC4" loading />
	</div>
);

export default Spinner;
