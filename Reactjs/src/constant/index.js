import img1 from "../assets/img/background-slider1.jpg";
import img2 from "../assets/img/background-slider2.jpg";
import img3 from "../assets/img/background-slider3.jpg";
import img4 from "../assets/img/background-slider4.jpg";
import safe from "../assets/img/safe.png";
import muscle from "../assets/img/muscle.png";


export const slide = [
    {
      image: img1,
      content: "Trải nghiệm của bạn là của tôi Khám phá thiên nhiên cùng Q&TTREKKING!",
    },
    {
      image: img2,
      content: "Chinh phục đỉnh cao, vượt qua mọi giới hạn với Q&TTREKKING.",
    },
    {
      image: img3,
      content: "Khám phá những vùng đất mới, trải nghiệm cùng những chuyên gia hàng đầu tại Q&TTREKKING.",
    },
    {
      image: img4,
      content: "Hãy để Q&TTREKKING dẫn lối bạn đến những cuộc phiêu lưu không giới hạn.",
    },
  ];

  export const experts = [
    {
      name: 'Phạm Quốc Thái',
      title: 'Business Consultant',
      description: 'Helping startups achieve scalability with proven strategies.',
      image: 'https://via.placeholder.com/150',
      tours: [
        "Fansipan - Nóc nhà Đông Dương",
        "Cà Mau - Tàu lượn siêu tốc"
      ],  // Danh sách các tour mà chuyên gia này dẫn dắt
    },
    {
      name: 'Bùi Quang Quý',
      title: 'Tech Innovator',
      description: 'Empowering businesses with innovative technology solutions.',
      image: 'https://via.placeholder.com/150',
      tours: [
        "Đồng Nai - Núi Cao Nhất Đồng Nai",
        "Sala quận 2 - Búp măng non"
      ],  // Danh sách các tour mà chuyên gia này dẫn dắt
    },
    {
      name: 'Bùi Quang Thái',
      title: 'Marketing Guru',
      description: 'Creating impactful campaigns to drive growth and engagement.',
      image: 'https://via.placeholder.com/150',
      tours: [
        "Hà Nội - Bơi khắp hồ gươm"
      ],  // Danh sách các tour mà chuyên gia này dẫn dắt
    },
    {
      name: 'Phạm Quốc Quý',
      title: 'Financial Advisor',
      description: 'Providing strategies for sustainable financial growth.',
      image: 'https://via.placeholder.com/150',
      tours: [
        "Cà Mau - Tàu lượn siêu tốc",
        "TPHCM - Đi bộ khắp sài gòn"
      ],  // Danh sách các tour mà chuyên gia này dẫn dắt
    },
  ];
  

 export const features = [
    {
      title: "An Toàn",
      icon: safe,
      description:
        "Yếu tố an toàn được ưu tiên hàng đầu, đảm bảo chuyến đi diễn ra suôn sẻ và khách hàng được trải nghiệm trọn vẹn hành trình.",
    },
    {
      title: "Chuyên Nghiệp",
      icon: muscle,
      description:
        "Là một trong những đơn vị tiên phong khai thác bài bản trekking, nỗ lực trau dồi kỹ năng chuyên môn mỗi ngày.",
    },
    {
      title: "Bền Vững",
      icon: "/img/pro.png",
      description:
        "Hoạt động hướng đến tự nhiên bền vững, bảo tồn đa dạng sinh học, hỗ trợ cộng đồng địa phương.",
    },
  ];

  export const categoryTour = [
    {
      title: 'Natural Walking',
      slug: 'Natural Walking',
      tours: [
        {
          name: "Fansipan - Nóc nhà Đông Dương",
          image: img1,
          description: "Hành trình chinh phục đỉnh cao 3.143m với cảnh sắc tuyệt đẹp.",
          price: "3.456.789 VND",
          guides: ["Phạm Quốc Thái", "Bùi Quang Quý"],  // Thêm danh sách người hướng dẫn
        },
        {
          name: "Cà Mau - Tàu lượn siêu tốc",
          image: img1,
          description: "Hành trình chinh phục đỉnh cao 3.143m với cảnh sắc tuyệt đẹp.",
          price: "3.456.789 VND",
          guides: ["Bùi Quang Thái"],  // Thêm người hướng dẫn
        },
        {
          name: "Cà Mau - Tàu lượn siêu tốc",
          image: img1,
          description: "Hành trình chinh phục đỉnh cao 3.143m với cảnh sắc tuyệt đẹp.",
          price: "3.456.789 VND",
          guides: ["Phạm Quốc Quý"],  // Thêm người hướng dẫn
        },
      ],
    },
    {
      title: 'Mountain Hiking',
      slug: 'Mountain Hiking',
      tours: [
        {
          name: "Đồng Nai - Núi Cao Nhất Đồng Nai",
          image: img1,
          description: "Hành trình chinh phục đỉnh cao 3.143m với cảnh sắc tuyệt đẹp.",
          price: "1 VND",
          guides: ["Phạm Quốc Thái"],  // Thêm người hướng dẫn
        },
        {
          name: "Sala quận 2 - Búp măng non",
          image: img1,
          description: "Hành trình chinh phục đỉnh cao 3.143m với cảnh sắc tuyệt đẹp.",
          price: "1 VND",
          guides: ["Bùi Quang Quý"],  // Thêm người hướng dẫn
        },
        {
          name: "Sala quận 2 - Búp măng non",
          image: img1,
          description: "Hành trình chinh phục đỉnh cao 3.143m với cảnh sắc tuyệt đẹp.",
          price: "1 VND",
          guides: ["Phạm Quốc Quý"],  // Thêm người hướng dẫn
        },
      ],
    },
    {
      title: 'Trekking',
      slug: 'Trekking',
      tours: [
        {
          name: "TPHCM - Đi bộ khắp sài gòn",
          image: img1,
          description: "Hành trình chinh phục đỉnh cao 3.143m với cảnh sắc tuyệt đẹp.",
          price: "99999 VND",
          guides: ["Bùi Quang Thái"],  // Thêm người hướng dẫn
        },
        {
          name: "Hà Nội - Bơi khắp hồ gươm",
          image: img1,
          description: "Hành trình chinh phục đỉnh cao 3.143m với cảnh sắc tuyệt đẹp.",
          price: "999999 VND",
          guides: ["Phạm Quốc Quý"],  // Thêm người hướng dẫn
        },
        {
          name: "Hà Nội - Bơi khắp hồ gươm",
          image: img1,
          description: "Hành trình chinh phục đỉnh cao 3.143m với cảnh sắc tuyệt đẹp.",
          price: "999999 VND",
          guides: ["Phạm Quốc Thái"],  // Thêm người hướng dẫn
        },
      ],
    },
  ];
  