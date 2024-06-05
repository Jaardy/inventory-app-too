import React, { useEffect, useState } from "react";
import CreateItemForm from "./CreateItemForm";
import Inventory from "./Inventory";
import UpdateItemForm from "./UpdateItemForm";

// import and prepend the api url to any fetch calls
import apiURL from "../api";

export const App = () => {
	const [items, setItems] = useState([]);
	const [currentItem, setCurrentItem] = useState(null);
	const [isFormShowing, setIsFormShowing] = useState(false);

	const [isEditFormShowing, setIsEditFormShowing] = useState(false);

	async function addItem(data) {
		const response = await fetch(`${apiURL}/items`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});

		if (response.ok) {
			const newItem = await response.json();
			setItems([...items, newItem]);
			setIsFormShowing(false);
		}
	}

	async function updateItem(id, data) {
		const response = await fetch(`${apiURL}/items/${id}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});

		if (response.ok) {
			// here is the updated item from the server
			const updatedItem = await response.json();

			// find the item whose id is the same as the updated item's id
			const index = items.findIndex(item => {
				if (item.id === id) {
					return true;
				} else {
					return false;
				}
			});

			// swap the old out item out for the new one, as a new array
			const updatedItems = items.toSpliced(index, 1, updatedItem);
			setItems(updatedItems);
			setCurrentItem(null);
			// setItems([...items, updatedItem]);
			// setIsFormShowing(false);
		}
	}

	async function deleteItem(id) {
		// Send the DELETE request to the back end
		const response = await fetch(`${apiURL}/items/${id}`, {
			method: "DELETE",
		});

		// If the DELETE request was successful...
		if (response.ok) {
			const filteredItems = items.filter(item => {
				if (item.id === id) {
					return false;
				} else {
					return true;
				}
			});

			// Remove the deleted item from state
			setItems(filteredItems);

			// Return to the home page
			setCurrentItem(null);
		}
	}

	function confirmDelete(id) {
		// Returns true if the user presses OK, otherwise false
		const confirmed = window.confirm("Are you sure you want to delete this item?");

		if (confirmed) {
			deleteItem(id);
		}
	}

	useEffect(() => {
		async function fetchItems() {
			try {
				const response = await fetch(`${apiURL}/items`);
				const itemsData = await response.json();
				setItems(itemsData);
			} catch (err) {
				console.log("Oh no an error!", err);
			}
		}

		fetchItems();
	}, []);

	// If there is no current item, show all items
	if (!currentItem) {
		return (
			<main>
				<h1>Inventory App</h1>
				<button onClick={() => setIsFormShowing(!isFormShowing)}>
					{isFormShowing ? "Hide Form" : "Show Form"}
				</button>
				{isFormShowing && <CreateItemForm addItem={addItem} />}
				<Inventory items={items} setCurrentItem={setCurrentItem} />
			</main>
		);
	}

	// Otherwise, show the single item view
	return (
		<main>
			<button onClick={() => setIsEditFormShowing(!isEditFormShowing)}>
				{isEditFormShowing ? "Hide Form" : "Show Form"}
			</button>
			{isEditFormShowing && <UpdateItemForm {...currentItem} updateItem={updateItem} />}
			<h1>{currentItem.name}</h1>
			<p>£{currentItem.price.toFixed(2)}</p>
			<p>{currentItem.description}</p>
			<img src={currentItem.image} alt="" />
			<p>
				<button onClick={() => setCurrentItem(null)}>All Items</button>
			</p>
			<p>
				<button onClick={() => confirmDelete(currentItem.id)}>Delete Item</button>
			</p>
		</main>
	);
};
