import React, { useState } from "react";

function UpdateItemForm(props) {
	const [name, setName] = useState(props.name);
	const [description, setDescription] = useState(props.description);
	const [price, setPrice] = useState(props.price);
	const [category, setCategory] = useState(props.category);
	const [image, setImage] = useState(props.image);

	function handleSubmit(event) {
		event.preventDefault();
		props.updateItem(props.id, { name, description, price, category, image });
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
					onChange={event => setPrice(event.target.value)}
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
				<button type="submit">Update Item</button>
			</p>
		</form>
	);
}

export default UpdateItemForm;
