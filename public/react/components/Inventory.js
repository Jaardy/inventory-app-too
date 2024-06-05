import React from "react";

function Inventory(props) {
	return (
		<ul className="inventory">
			{props.items.map(item => (
				<li key={item.id}>
					<h2>
						<button onClick={() => props.setCurrentItem(item)}>{item.name}</button>
					</h2>
					<img src={item.image} alt="" />
				</li>
			))}
		</ul>
	);
}

export default Inventory;
