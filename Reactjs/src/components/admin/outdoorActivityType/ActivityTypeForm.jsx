import { useEffect, useState } from 'react';

const ActivityTypeForm = ({ onSubmit, activity, onCancel }) => {
	const [form, setForm] = useState({ name: '', typeDescription: '', activationState: 'Show' });

	useEffect(() => {
		if (activity) {
			setForm(activity);
		} else {
			setForm({
				name: '',
				typeDescription: '',
				activationState: 'Show',
			});
		}
	}, [activity]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit(form);
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-6 bg-white p-4 shadow-lg rounded-lg">
			<div>
				<label htmlFor="name" className="block text-sm font-medium text-gray-700">
					Name
				</label>
				<input
					id="name"
					name="name"
					value={form.name}
					onChange={handleChange}
					placeholder="Enter activity name"
					className="block w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
				/>
			</div>

			<div>
				<label htmlFor="typeDescription" className="block text-sm font-medium text-gray-700">
					Description
				</label>
				<textarea
					id="typeDescription"
					name="typeDescription"
					value={form.typeDescription}
					onChange={handleChange}
					placeholder="Enter activity description"
					rows={4}
					className="block w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
				></textarea>
			</div>

			<div>
				<label htmlFor="activationState" className="block text-sm font-medium text-gray-700">
					Activation State
				</label>
				<select
					id="activationState"
					name="activationState"
					value={form.activationState}
					onChange={handleChange}
					className="block w-full border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
				>
					<option value="Show">Show</option>
					<option value="Hide">Hide</option>
				</select>
			</div>

			<div className="flex justify-between space-x-4">
				<button
					type="submit"
					className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
				>
					{activity ? 'Update' : 'Create'}
				</button>

				{activity && (
					<button
						type="button"
						onClick={onCancel}
						className="w-full bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
					>
						Cancel
					</button>
				)}
			</div>
		</form>
	);
};

export default ActivityTypeForm;
