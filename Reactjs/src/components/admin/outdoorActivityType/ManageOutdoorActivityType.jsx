import React, { useEffect, useState } from 'react';
import {
	handleCreateOutdoorActivityTypeServices,
	handleDeleteOutdoorActivityTypeServices,
	handleGetAllOutdoorActivityTypeServices,
	handleUpdateOutdoorActivityTypeServices,
} from '../../../services/adminServices';
import ActivityTypeTable from './ActivityTypeTable';
import ActivityTypeForm from './ActivityTypeForm';
import { toast } from 'react-toastify';

const ManageOutdoorActivity = () => {
	const [activityTypes, setActivityTypes] = useState([]);
	const [loading, setLoading] = useState(true);
	const [selectedActivity, setSelectedActivity] = useState(null);

	const fetchActivityTypes = async () => {
		setLoading(true);
		try {
			const res = await handleGetAllOutdoorActivityTypeServices({ id: 'ALL' });
			if (res?.data?.errCode === 0) {
				setActivityTypes(res?.data?.data);
			} else {
				console.error(res.errMessage);
			}
		} catch (error) {
			console.error('Error fetching activity types:', error);
		}
		setLoading(false);
	};

	useEffect(() => {
		fetchActivityTypes();
	}, []);

	const validateForm = (activity) => {
		if (!activity.name.trim() || !activity.typeDescription.trim()) {
			toast.error('Activity name and typeDescription is required');
			return false;
		}
		return true;
	};

	const handleSubmit = async (activity) => {
		if (!validateForm(activity)) {
			return;
		}

		if (activity.id) {
			// handleUpdateActivityType
			try {
				let res = await handleUpdateOutdoorActivityTypeServices(activity);
				if (res?.data?.errCode === 0) {
					setActivityTypes(activityTypes.map((item) => (item.id === activity.id ? activity : item)));
					setSelectedActivity(null);
					toast.success(res.data.errMessage);
				} else {
					toast.error(res.data.errMessage);
				}
			} catch (e) {
				toast.error('Error updating activity:', e);
			}
		} else {
			// handleCreateActivityType
			try {
				let res = await handleCreateOutdoorActivityTypeServices(activity);
				if (res?.data?.errCode === 0) {
					setActivityTypes([...activityTypes, res?.data?.data]);
					toast.success(res.data.errMessage);
				} else {
					toast.error(res.data.errMessage);
				}
			} catch (e) {
				toast.error('Error creating activity:', e);
			}
		}
	};

	const handleEdit = (activity) => {
		setSelectedActivity(activity);
	};

	const handleCancelEdit = () => {
		setSelectedActivity(null);
	};

	const handleDelete = async (id) => {
		try {
			if (window.confirm('Are you sure you want to delete this activity?')) {
				let res = await handleDeleteOutdoorActivityTypeServices({ id });
				if (res?.data?.errCode === 0) {
					setActivityTypes(activityTypes.filter((activity) => activity.id !== id));
					toast.success(res.data.errMessage);
				} else {
					toast.error(res.data.errMessage);
				}
			}
		} catch (error) {
			toast.error('Error deleting activity type:', error);
		}
	};

	const handleToggleActivation = async (activity) => {
		try {
			let activationState = activity.activationState === 'Show' ? 'Hide' : 'Show';
			let res = await handleUpdateOutdoorActivityTypeServices({ ...activity, activationState });
			if (res?.data?.errCode === 0) {
				setActivityTypes(
					activityTypes.map((item) => (item.id === activity.id ? { ...item, activationState } : item)),
				);
				toast.success(res.data.errMessage);
			} else {
				toast.error(res.data.errMessage);
			}
		} catch (e) {
			toast.error('Error toggling activation:', e);
		}
	};

	return (
		<div className="p-6">
			<h1 className="text-2xl font-bold mb-6 text-center">Manage Outdoor Activities</h1>

			<div className="flex flex-col md:flex-row md:gap-x-8 gap-y-8">
				{/* Form Section */}
				<div className="w-full md:w-1/3">
					<h2 className="text-xl font-semibold mb-4">Add/Edit Activity</h2>
					<ActivityTypeForm onSubmit={handleSubmit} activity={selectedActivity} onCancel={handleCancelEdit} />
				</div>

				{/* Table Section */}
				<div className="w-full md:w-2/3">
					<h2 className="text-xl font-semibold mb-4">Activity List</h2>
					{loading ? (
						<p>Loading...</p>
					) : (
						<ActivityTypeTable
							data={activityTypes}
							onEdit={handleEdit}
							onDelete={handleDelete}
							onToggleActivation={handleToggleActivation}
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export default ManageOutdoorActivity;
