import db from '../models';

// CREATE TOUR
let createTourServices = async (data) => {
	return new Promise(async (resolve, reject) => {
		try {
			const requiredFields = [
				'tourName',
				'outdoorActivityTypeId',
				'tourDescription',
				'image',
				'guideId',
				'best_month',
				'max_guests',
				'pickup_time',
				'pickup_location',
				'group_assembly_area',
				'conquest_duration',
				'medical_access_time',
				'distance',
				'peak_altitude',
				'activity_duration',
				'schedule_detail',
				'price',
			];

			const missingField = requiredFields.find((field) => !data[field]);
			if (missingField) {
				return resolve({
					errCode: 1,
					errMessage: `Missing parameter: ${missingField}`,
				});
			}

			// Kiểm tra tour đã tồn tại chưa
			const existingTour = await db.Tour.findOne({
				where: {
					tourName: data.tourName,
					pickup_time: data.pickup_time,
				},
			});

			if (existingTour) {
				return resolve({
					errCode: 2,
					errMessage: 'Tour already exists!',
				});
			}

			// Tạo tour mới
			const newTour = await db.Tour.create({
				...data,
				status: 'Open',
				hidden: false,
			});

			// Trả về kết quả thành công
			resolve({
				errCode: 0,
				data: newTour,
				errMessage: 'Tour created successfully!',
			});
		} catch (error) {
			// Xử lý lỗi
			reject({
				errCode: -1,
				errMessage: 'Error from server!',
				error: error.message,
			});
		}
	});
};

// UPDATE TOUR
let updateTourServices = async (data) => {
	return new Promise(async (resolve, reject) => {
		try {
			const requiredFields = [
				'id',
				'tourName',
				'outdoorActivityTypeId',
				'image',
				'guideId',
				'best_month',
				'max_guests',
				'pickup_time',
				'pickup_location',
				'group_assembly_area',
				'conquest_duration',
				'medical_access_time',
				'distance',
				'peak_altitude',
				'activity_duration',
				'schedule_detail',
				'price',
				'status',
				'hidden',
			];

			// Kiểm tra trường bị thiếu
			const missingField = requiredFields.find((field) => !data[field]);
			if (missingField) {
				return resolve({
					errCode: 1,
					errMessage: `Missing parameter: ${missingField}`,
				});
			}

			// Cập nhật tour trong cơ sở dữ liệu
			const [updatedCount] = await db.Tour.update(data, {
				where: { id: data.id },
			});

			if (updatedCount === 1) {
				return resolve({
					errCode: 0,
					errMessage: 'Tour updated successfully',
				});
			} else {
				return resolve({
					errCode: 2,
					errMessage: 'Tour update failed or no changes detected',
				});
			}
		} catch (error) {
			// Xử lý lỗi từ server
			console.error(error);
			reject({
				errCode: -1,
				errMessage: 'Error from server!',
				error: error.message,
			});
		}
	});
};

// DELETE TOUR
let deleteTourServices = async (tourId) => {
	return new Promise(async (resolve, reject) => {
		try {
			// Kiểm tra xem tourId có hợp lệ không
			if (!tourId) {
				return resolve({
					errCode: 1,
					errMessage: 'Missing parameters!',
				});
			}

			// Xóa tour khỏi cơ sở dữ liệu
			const deletedCount = await db.Tour.destroy({
				where: { id: tourId },
			});

			// Kiểm tra kết quả xóa
			if (deletedCount > 0) {
				resolve({
					errCode: 0,
					errMessage: 'Delete tour successfully!',
				});
			} else {
				resolve({
					errCode: 2,
					errMessage: 'Delete tour failed or tour not found!',
				});
			}
		} catch (e) {
			// Xử lý lỗi từ server
			console.error(e);
			reject({
				errCode: -1,
				errMessage: 'Error from server!',
				error: e.message,
			});
		}
	});
};

// GET ALL GUIDE
let getAllTourServices = async (data) => {
	return new Promise(async (resolve, reject) => {
		try {
			let tours;

			// Nếu id là 'ALL', lấy tất cả các tour
			if (data.id === 'ALL') {
				const whereClause = {}; // Điều kiện mặc định
				if (data.hidden !== undefined) {
					whereClause.hidden = data.hidden; // Lọc theo trạng thái ẩn
				}

				tours = await db.Tour.findAll({
					where: whereClause,
					include: [
						{
							model: db.OutdoorActivityType,
							as: 'activityType',
						},
						{
							model: db.Guide,
							as: 'guide',
						},
					],
				});
			}
			// Nếu có id cụ thể, lấy tour theo id
			else if (data.id) {
				tours = await db.Tour.findOne({
					where: { id: data.id },
					include: [
						{
							model: db.OutdoorActivityType,
							as: 'activityType',
						},
						{
							model: db.Guide,
							as: 'guide',
						},
					],
				});
			}
			// Nếu không có điều kiện id hoặc missing parameters
			else {
				resolve({
					errCode: 1,
					errMessage: 'Missing required parameters!',
				});
				return;
			}

			// Trả về kết quả
			resolve({
				errCode: 0,
				data: tours || [],
			});
		} catch (e) {
			console.log('ERROR:', e);
			reject({
				errCode: -1,
				errMessage: 'An error occurred while fetching tours!',
				error: e.message,
			});
		}
	});
};

module.exports = {
	createTourServices,
	updateTourServices,
	deleteTourServices,
	getAllTourServices,
};
