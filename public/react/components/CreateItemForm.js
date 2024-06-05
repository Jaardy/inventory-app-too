import React, { useState } from "react";

function CreateItemForm(props) {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState(0);
	const [category, setCategory] = useState("");
	const [image, setImage] = useState("");

	function handleSubmit(event) {
		event.preventDefault();
		props.addItem({ name, description, price, category, image });
		setName("");
		setDescription("");
		setPrice(0);
		setCategory("");
		setImage("");
	}

	return (
		<form onSubmit={handleSubmit}>
			<p className="huge">
				<label htmlFor="name">Name</label>
				<br />
				<input type="text" name="name" id="name" value={name} onChange={event => setName(event.target.value)} />
			</p>
			<p>
				<label htmlFor="description">Description</label>
				<br />
				<textarea
					name="description"
					id="description"
					value={description}
					onChange={event => setDescription(event.target.value)}
				/>
			</p>
			<p>
				<label htmlFor="price">Price</label>
				<br />
				<input
					type="number"
					name="price"
					id="price"
					value={price}
					onChange={event => setPrice(event.target.valueAsNumber)}
				/>
			</p>
			<p>
				<label htmlFor="category">Category</label>
				<br />
				<input
					type="text"
					name="category"
					id="category"
					value={category}
					onChange={event => setCategory(event.target.value)}
				/>
			</p>
			<p>
				<label htmlFor="image">Image</label>
				<br />
				<input
					type="url"
					name="image"
					id="image"
					value={image}
					onChange={event => setImage(event.target.value)}
				/>
			</p>
			<p>
				<button type="submit">Add Item</button>
			</p>
		</form>
	);
}

export default CreateItemForm;
