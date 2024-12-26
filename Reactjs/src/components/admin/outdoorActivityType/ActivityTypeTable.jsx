const ActivityTypeTable = ({ data, onEdit, onDelete, onToggleActivation }) => {
	return (
		<div className="overflow-x-auto">
			<table className="table-auto w-full border-collapse border border-gray-200 text-sm md:text-base">
				<thead>
					<tr className="bg-gray-100">
						<th className="border border-gray-300 px-4 py-2 text-center">Name</th>
						<th className="border border-gray-300 px-4 py-2 text-center">Description</th>
						<th className="border border-gray-300 px-4 py-2 text-center">Activation State</th>
						<th className="border border-gray-300 px-4 py-2 text-center">Actions</th>
					</tr>
				</thead>
				<tbody>
					{data.map((activity) => (
						<tr key={activity.id} className="hover:bg-gray-50">
							<td className="border border-gray-300 px-4 py-2">{activity.name}</td>
							<td className="border border-gray-300 px-4 py-2">{activity.typeDescription}</td>
							<td
								className="border border-gray-300 px-4 py-2 text-center"
								onClick={() => onToggleActivation(activity)}
							>
								<button className="text-blue-500 hover:underline">{activity.activationState}</button>
							</td>
							<td className="border border-gray-300 px-4 py-2">
								<div className="flex justify-center border-b border-gray-300 pb-2 mb-2">
									<button className="text-blue-500 hover:underline" onClick={() => onEdit(activity)}>
										Edit
									</button>
								</div>
								<div className="flex justify-center">
									<button
										className="text-red-500 hover:underline"
										onClick={() => onDelete(activity.id)}
									>
										Delete
									</button>
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default ActivityTypeTable;
