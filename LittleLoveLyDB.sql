CREATE DATABASE [LittleLoveLy]
EXEC [LittleLoveLy].[dbo].[sp_fulltext_database] @action = 'enable'

USE [LittleLoveLy]
GO
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[article](
	[article_id] [bigint] IDENTITY(1,1) NOT NULL,
	[active] [bit] NOT NULL,
	[content] [nvarchar](max) NULL,
	[title] [nvarchar](255) NULL,
	[uploaded_date] [datetime2](6) NULL,
PRIMARY KEY CLUSTERED 
(
	[article_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[article_image]    Script Date: 2024-06-02 1:24:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[article_image](
	[image_id] [bigint] IDENTITY(1,1) NOT NULL,
	[image_path] [nvarchar](255) NULL,
	[fk_article_id] [bigint] NULL,
PRIMARY KEY CLUSTERED 
(
	[image_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[brand]    Script Date: 2024-06-02 1:24:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[brand](
	[brand_id] [bigint] IDENTITY(1,1) NOT NULL,
	[logo] [nvarchar](255) NULL,
	[name] [nvarchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[brand_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[brand_specializing]    Script Date: 2024-06-02 1:24:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[brand_specializing](
	[fk_brand_id] [bigint] NOT NULL,
	[fk_category_id] [bigint] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[category]    Script Date: 2024-06-02 1:24:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[category](
	[category_id] [bigint] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](255) NULL,
	[parent_category_id] [bigint] NULL,
PRIMARY KEY CLUSTERED 
(
	[category_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[gift]    Script Date: 2024-06-02 1:24:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[gift](
	[gift_id] [bigint] IDENTITY(1,1) NOT NULL,
	[active] [bit] NOT NULL,
	[name] [nvarchar](255) NULL,
	[point] [int] NULL,
	[stock] [int] NULL,
	[image_path] [nvarchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[gift_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[gift_including]    Script Date: 2024-06-02 1:24:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[gift_including](
	[point] [int] NULL,
	[quantity] [int] NULL,
	[fk_gift_id] [bigint] NOT NULL,
	[fk_order_id] [varchar](255) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[fk_gift_id] ASC,
	[fk_order_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[order]    Script Date: 2024-06-02 1:24:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[order](
	[order_id] [varchar](255) NOT NULL,
	[created_date] [datetime2](6) NULL,
	[cus_city] [nvarchar](255) NULL,
	[cus_district] [nvarchar](255) NULL,
	[cus_mail] [nvarchar](255) NULL,
	[cus_name] [nvarchar](255) NULL,
	[cus_phone] [nvarchar](255) NULL,
	[cus_street] [nvarchar](255) NULL,
	[cus_ward] [nvarchar](255) NULL,
	[post_discount_price] [float] NULL,
	[status] [nvarchar](255) NULL,
	[total_point] [int] NULL,
	[total_price] [float] NULL,
	[total_quantity] [int] NULL,
	[tracking_code] [nvarchar](255) NULL,
	[fk_username] [varchar](255) NULL,
	[fk_voucher_id] [bigint] NULL,
PRIMARY KEY CLUSTERED 
(
	[order_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[order_detail]    Script Date: 2024-06-02 1:24:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[order_detail](
	[price] [float] NULL,
	[quantity] [int] NULL,
	[fk_order_id] [varchar](255) NOT NULL,
	[fk_product_id] [bigint] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[fk_order_id] ASC,
	[fk_product_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[product]    Script Date: 2024-06-02 1:24:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[product](
	[product_id] [bigint] IDENTITY(1,1) NOT NULL,
	[active] [bit] NOT NULL,
	[listed_price] [float] NULL,
	[name] [nvarchar](255) NULL,
	[no_sold] [int] NULL,
	[selling_price] [float] NULL,
	[stock] [int] NULL,
	[fk_brand_id] [bigint] NULL,
	[description] [nvarchar](max) NULL,
PRIMARY KEY CLUSTERED 
(
	[product_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[product_category]    Script Date: 2024-06-02 1:24:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[product_category](
	[fk_product_id] [bigint] NOT NULL,
	[fk_category_id] [bigint] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[product_featuring]    Script Date: 2024-06-02 1:24:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[product_featuring](
	[fk_article_id] [bigint] NOT NULL,
	[fk_product_id] [bigint] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[product_image]    Script Date: 2024-06-02 1:24:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[product_image](
	[image_id] [bigint] IDENTITY(1,1) NOT NULL,
	[image_path] [nvarchar](255) NULL,
	[fk_product_id] [bigint] NULL,
PRIMARY KEY CLUSTERED 
(
	[image_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[product_review]    Script Date: 2024-06-02 1:24:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[product_review](
	[fk_product_id] [bigint] NOT NULL,
	[fk_username] [varchar](255) NOT NULL,
	[feedback] [nvarchar](max) NULL,
	[star] [int] NULL,
	[image_path] [nvarchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[fk_product_id] ASC,
	[fk_username] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[user]    Script Date: 2024-06-02 1:24:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[user](
	[username] [varchar](255) NOT NULL,
	[city] [nvarchar](255) NULL,
	[district] [nvarchar](255) NULL,
	[mail] [nvarchar](255) NULL,
	[name] [nvarchar](255) NULL,
	[password] [nvarchar](255) NULL,
	[phone] [nvarchar](255) NULL,
	[point] [int] NULL,
	[role] [nvarchar](255) NULL,
	[street] [nvarchar](255) NULL,
	[ward] [nvarchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[username] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[voucher]    Script Date: 2024-06-02 1:24:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[voucher](
	[voucher_id] [bigint] IDENTITY(1,1) NOT NULL,
	[active] [bit] NOT NULL,
	[description] [nvarchar](max) NULL,
	[discount_price] [float] NULL,
	[discount_rate] [float] NULL,
	[expiry_date] [datetime2](6) NULL,
	[title] [nvarchar](255) NULL,
	[type] [int] NULL,
	[valid_max_discount] [float] NULL,
	[valid_min_price] [float] NULL,
	[limit] [int] NULL,
	[applied_count] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[voucher_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[voucher_availability]    Script Date: 2024-06-02 1:24:14 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[voucher_availability](
	[fk_username] [varchar](255) NOT NULL,
	[fk_voucher_id] [bigint] NOT NULL
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[brand] ON 
GO
INSERT [dbo].[brand] ([brand_id], [logo], [name]) VALUES (1, NULL, N'Enfa')
GO
INSERT [dbo].[brand] ([brand_id], [logo], [name]) VALUES (2, NULL, N'Similac')
GO
INSERT [dbo].[brand] ([brand_id], [logo], [name]) VALUES (3, NULL, N'Abbott')
GO
INSERT [dbo].[brand] ([brand_id], [logo], [name]) VALUES (4, NULL, N'PediaSure')
GO
INSERT [dbo].[brand] ([brand_id], [logo], [name]) VALUES (5, NULL, N'Meiji')
GO
INSERT [dbo].[brand] ([brand_id], [logo], [name]) VALUES (6, NULL, N'Morinaga')
GO
INSERT [dbo].[brand] ([brand_id], [logo], [name]) VALUES (7, NULL, N'Wakodo')
GO
INSERT [dbo].[brand] ([brand_id], [logo], [name]) VALUES (8, NULL, N'Vinamilk')
GO
INSERT [dbo].[brand] ([brand_id], [logo], [name]) VALUES (9, NULL, N'Bellamy''s Organic')
GO
INSERT [dbo].[brand] ([brand_id], [logo], [name]) VALUES (10, NULL, N'VitaDairy')
GO
INSERT [dbo].[brand] ([brand_id], [logo], [name]) VALUES (11, NULL, N'Humana')
GO
INSERT [dbo].[brand] ([brand_id], [logo], [name]) VALUES (12, NULL, N'HiPP')
GO
INSERT [dbo].[brand] ([brand_id], [logo], [name]) VALUES (13, NULL, N'Nestlé')
GO
INSERT [dbo].[brand] ([brand_id], [logo], [name]) VALUES (14, NULL, N'Friso')
GO
INSERT [dbo].[brand] ([brand_id], [logo], [name]) VALUES (15, NULL, N'Fruto Nyanya')
GO
INSERT [dbo].[brand] ([brand_id], [logo], [name]) VALUES (16, NULL, N'a2 Milk')
GO
INSERT [dbo].[brand] ([brand_id], [logo], [name]) VALUES (17, NULL, N'Oldenburger')
GO
INSERT [dbo].[brand] ([brand_id], [logo], [name]) VALUES (18, NULL, N'Hoff')
GO
INSERT [dbo].[brand] ([brand_id], [logo], [name]) VALUES (19, NULL, N'Yakult')
GO
INSERT [dbo].[brand] ([brand_id], [logo], [name]) VALUES (20, NULL, N'Dutch Lady')
GO
INSERT [dbo].[brand] ([brand_id], [logo], [name]) VALUES (21, NULL, N'TH Milk')
GO
INSERT [dbo].[brand] ([brand_id], [logo], [name]) VALUES (22, NULL, N'Sahmyook')
GO
INSERT [dbo].[brand] ([brand_id], [logo], [name]) VALUES (23, NULL, N'137 Degrees')
GO
INSERT [dbo].[brand] ([brand_id], [logo], [name]) VALUES (24, NULL, N'KI&YOUNG')
GO
INSERT [dbo].[brand] ([brand_id], [logo], [name]) VALUES (25, NULL, N'Nunest')
GO
INSERT [dbo].[brand] ([brand_id], [logo], [name]) VALUES (26, NULL, N'Dalat Milk')
GO
INSERT [dbo].[brand] ([brand_id], [logo], [name]) VALUES (27, NULL, N'Agusha')
GO
INSERT [dbo].[brand] ([brand_id], [logo], [name]) VALUES (28, NULL, N'Morning Rice')
GO
INSERT [dbo].[brand] ([brand_id], [logo], [name]) VALUES (29, NULL, N'Moony Natural')
GO
INSERT [dbo].[brand] ([brand_id], [logo], [name]) VALUES (30, NULL, N'Whito')
GO
INSERT [dbo].[brand] ([brand_id], [logo], [name]) VALUES (31, NULL, N'Pampers')
GO
INSERT [dbo].[brand] ([brand_id], [logo], [name]) VALUES (32, NULL, N'Moony Blue')
GO
INSERT [dbo].[brand] ([brand_id], [logo], [name]) VALUES (33, NULL, N'Bobby')
GO
SET IDENTITY_INSERT [dbo].[brand] OFF
GO
SET IDENTITY_INSERT [dbo].[category] ON 
GO
INSERT [dbo].[category] ([category_id], [name], [parent_category_id]) VALUES (1, N'Sữa bột cao cấp', NULL)
GO
INSERT [dbo].[category] ([category_id], [name], [parent_category_id]) VALUES (2, N'Sữa tươi các loại', NULL)
GO
INSERT [dbo].[category] ([category_id], [name], [parent_category_id]) VALUES (3, N'Bỉm tã', NULL)
GO
INSERT [dbo].[category] ([category_id], [name], [parent_category_id]) VALUES (4, N'Ăn dặm, dinh dưỡng', NULL)
GO
INSERT [dbo].[category] ([category_id], [name], [parent_category_id]) VALUES (5, N'Đồ dùng mẹ & bé', NULL)
GO
INSERT [dbo].[category] ([category_id], [name], [parent_category_id]) VALUES (6, N'Thời trang & phụ kiện', NULL)
GO
INSERT [dbo].[category] ([category_id], [name], [parent_category_id]) VALUES (7, N'Đồ chơi, học tập', NULL)
GO
INSERT [dbo].[category] ([category_id], [name], [parent_category_id]) VALUES (8, N'Chăm sóc gia đình', NULL)
GO
INSERT [dbo].[category] ([category_id], [name], [parent_category_id]) VALUES (9, N'Sữa Mỹ', 1)
GO
INSERT [dbo].[category] ([category_id], [name], [parent_category_id]) VALUES (10, N'Sữa Nhật', 1)
GO
INSERT [dbo].[category] ([category_id], [name], [parent_category_id]) VALUES (11, N'Sữa Việt', 1)
GO
INSERT [dbo].[category] ([category_id], [name], [parent_category_id]) VALUES (12, N'Sữa Úc', 1)
GO
INSERT [dbo].[category] ([category_id], [name], [parent_category_id]) VALUES (13, N'Sữa châu Âu', 1)
GO
INSERT [dbo].[category] ([category_id], [name], [parent_category_id]) VALUES (14, N'0-1 tuổi', 1)
GO
INSERT [dbo].[category] ([category_id], [name], [parent_category_id]) VALUES (15, N'1-2 tuổi', 1)
GO
INSERT [dbo].[category] ([category_id], [name], [parent_category_id]) VALUES (16, N'>2 tuổi', 1)
GO
INSERT [dbo].[category] ([category_id], [name], [parent_category_id]) VALUES (17, N'Sữa bầu', 1)
GO
INSERT [dbo].[category] ([category_id], [name], [parent_category_id]) VALUES (18, N'Sữa người lớn', 1)
GO
INSERT [dbo].[category] ([category_id], [name], [parent_category_id]) VALUES (19, N'Sữa bột pha sẵn', 2)
GO
INSERT [dbo].[category] ([category_id], [name], [parent_category_id]) VALUES (20, N'Sữa tươi sữa chua', 2)
GO
INSERT [dbo].[category] ([category_id], [name], [parent_category_id]) VALUES (21, N'Sữa hạt dinh dưỡng', 2)
GO
INSERT [dbo].[category] ([category_id], [name], [parent_category_id]) VALUES (22, N'Thức uống dinh dưỡng', 2)
GO
INSERT [dbo].[category] ([category_id], [name], [parent_category_id]) VALUES (23, N'Tã quần', 3)
GO
INSERT [dbo].[category] ([category_id], [name], [parent_category_id]) VALUES (24, N'Tã dán', 3)
GO
INSERT [dbo].[category] ([category_id], [name], [parent_category_id]) VALUES (25, N'Miếng lót', 3)
GO
INSERT [dbo].[category] ([category_id], [name], [parent_category_id]) VALUES (26, N'NB <5kg', 3)
GO
INSERT [dbo].[category] ([category_id], [name], [parent_category_id]) VALUES (27, N'S 4-8kg', 3)
GO
INSERT [dbo].[category] ([category_id], [name], [parent_category_id]) VALUES (28, N'M 5-11kg', 3)
GO
INSERT [dbo].[category] ([category_id], [name], [parent_category_id]) VALUES (29, N'L 9-14kg', 3)
GO
INSERT [dbo].[category] ([category_id], [name], [parent_category_id]) VALUES (30, N'XL 12-18kg', 3)
GO
INSERT [dbo].[category] ([category_id], [name], [parent_category_id]) VALUES (31, N'XXL 13-25kg', 3)
GO
INSERT [dbo].[category] ([category_id], [name], [parent_category_id]) VALUES (32, N'Bột, bánh ăn dặm', 4)
GO
INSERT [dbo].[category] ([category_id], [name], [parent_category_id]) VALUES (33, N'Cháo, mì, nước sốt', 4)
GO
INSERT [dbo].[category] ([category_id], [name], [parent_category_id]) VALUES (34, N'Gia vị chế biến', 4)
GO
INSERT [dbo].[category] ([category_id], [name], [parent_category_id]) VALUES (35, N'Bánh, kẹo', 4)
GO
INSERT [dbo].[category] ([category_id], [name], [parent_category_id]) VALUES (36, N'Phô mai váng sữa', 4)
GO
INSERT [dbo].[category] ([category_id], [name], [parent_category_id]) VALUES (37, N'Bình sữa, phụ kiện', 5)
GO
INSERT [dbo].[category] ([category_id], [name], [parent_category_id]) VALUES (38, N'Đồ dùng bé ngủ', 5)
GO
INSERT [dbo].[category] ([category_id], [name], [parent_category_id]) VALUES (39, N'Máy hút sữa', 5)
GO
INSERT [dbo].[category] ([category_id], [name], [parent_category_id]) VALUES (40, N'Sản phẩm cho mẹ', 5)
GO
INSERT [dbo].[category] ([category_id], [name], [parent_category_id]) VALUES (41, N'Túi trữ sữa', 5)
GO
INSERT [dbo].[category] ([category_id], [name], [parent_category_id]) VALUES (42, N'Khăn, vải', 5)
GO
INSERT [dbo].[category] ([category_id], [name], [parent_category_id]) VALUES (43, N'Ti ngậm cho bé', 5)
GO
INSERT [dbo].[category] ([category_id], [name], [parent_category_id]) VALUES (44, N'Bé trai', 6)
GO
INSERT [dbo].[category] ([category_id], [name], [parent_category_id]) VALUES (45, N'Bé gái', 6)
GO
INSERT [dbo].[category] ([category_id], [name], [parent_category_id]) VALUES (46, N'Sơ sinh', 6)
GO
INSERT [dbo].[category] ([category_id], [name], [parent_category_id]) VALUES (47, N'Đồ chơi bé trai', 7)
GO
INSERT [dbo].[category] ([category_id], [name], [parent_category_id]) VALUES (48, N'Đồ chơi bé gái', 7)
GO
INSERT [dbo].[category] ([category_id], [name], [parent_category_id]) VALUES (49, N'Đồ chơi sơ sinh', 7)
GO
INSERT [dbo].[category] ([category_id], [name], [parent_category_id]) VALUES (50, N'Đồ chơi cát nước', 7)
GO
INSERT [dbo].[category] ([category_id], [name], [parent_category_id]) VALUES (51, N'Sách, học tập', 7)
GO
INSERT [dbo].[category] ([category_id], [name], [parent_category_id]) VALUES (52, N'Đồ dùng, vật dụng', 8)
GO
INSERT [dbo].[category] ([category_id], [name], [parent_category_id]) VALUES (53, N'Giặt xả quần áo', 8)
GO
INSERT [dbo].[category] ([category_id], [name], [parent_category_id]) VALUES (54, N'Nước rửa các loại', 8)
GO
INSERT [dbo].[category] ([category_id], [name], [parent_category_id]) VALUES (55, N'Nước lau sàn', 8)
GO
INSERT [dbo].[category] ([category_id], [name], [parent_category_id]) VALUES (56, N'Tắm gội, vệ sinh', 8)
GO
SET IDENTITY_INSERT [dbo].[category] OFF
GO
SET IDENTITY_INSERT [dbo].[product] ON 
GO
INSERT [dbo].[product] ([product_id], [active], [listed_price], [name], [no_sold], [selling_price], [stock], [fk_brand_id], [description]) VALUES (1, 1, 935000, N'Sữa Enfagrow A+ số 4 1700g (2-6 tuổi) 2Flex', 51, 935000, NULL, 1, N'Hướng dẫn sử dụng
Bước 1: Rửa sạch tay bằng xà phòng và nước trước khi pha sữa
Bước 2: Tiệt trùng các dụng cụ pha sữa, cốc và nắp bằng cách đun với nước sôi trong vòng 1 phút hoặc bằng máy tiệt trùng
Bước 3: Đun sôi nước trong 1 phút và để nguội đến nhiệt độ không quá 35-40°C
Bước 4: Cho đúng lượng nước đã nguội cần dùng vào dung cụ pha. Sau đó cho sữa bột vào. Lưu ý sử dụng muỗng có trong hộp và bảo quản khô ráo ở rãnh kẹp trên nắp
Bước 5: Đậy nắp dụng cụ và lắc đều.
Hướng dẫn bảo quản        
. Bảo quản hộp sữa bột Enfagrow A+ NeuroPro ở nơi thoáng mát, khô ráo trước và sau khi mở.
. Sau khi mở, đóng chặt nắp để đảm bảo chất lượng sản phẩm.
. Nên sử dụng sản phẩm trong vòng 1 tháng kể từ lần mở hộp đầu tiên.')
GO
INSERT [dbo].[product] ([product_id], [active], [listed_price], [name], [no_sold], [selling_price], [stock], [fk_brand_id], [description]) VALUES (2, 1, 519000, N'Sữa Similac 5G số 4 900g (2-6 tuổi)', 30, 519000, NULL, 2, N'Hướng dẫn sử dụng
. Sử dụng theo hướng dẫn của nhân viên y tế.
. Khi pha cần vệ sinh sạch sẽ, pha và bảo quản đúng cách.
. Không tuân thủ các hướng dẫn này có thể sẽ gây ảnh hưởng không tốt cho sức khỏe của bé.
. Các loại sản phẩm dinh dưỡng công thức đều không tuyệt đối vô trùng, do đó khi dùng cho trẻ sinh non hoặc trẻ có vấn đề về miễn dịch cần phải theo sự hướng dẫn và theo dõi của bác sĩ.
. Nước dùng để pha phải được đun sôi 5 phút, để nguội và pha cẩn thận theo hướng dẫn kèm theo.
. Chỉ dùng muỗng có sẵn trong hộp để lường.
. Nếu pha hơn 1 lần dùng thì lượng pha dư phải giữ lạnh ở nhiệt độ 2-4 độ C và dùng trong 24h.
. Chỉ cho bé dùng tối đa trong vòng 1h, sau đó phải đổ bỏ phần còn thừa.
Hướng dẫn bảo quản
. Bảo quản hộp chưa mở nắp ở nhiệt độ phòng.
. Hộp đã mở nắp nên sử dụng trong vòng 3 tuần.
. Đậy nắp kín và bảo quản nơi khô mát (không để trong tủ lạnh).')
GO
INSERT [dbo].[product] ([product_id], [active], [listed_price], [name], [no_sold], [selling_price], [stock], [fk_brand_id], [description]) VALUES (3, 1, 335000, N'Sữa Abbott Grow 4 900g (trên 2 tuổi)', 20, 335000, NULL, 3, N'Độ tuổi phù hợp        . Cho trẻ trên 2 tuổi
Cảnh báo        . Không dùng lò vi sóng để pha hay hâm nóng vì có thể gây bỏng. Dùng nhiều lần lượng pha không đúng cách có thể ảnh hưởng không tốt cho sức khỏe của trẻ.
Hướng dẫn sử dụng        . Rửa sạch tay trước khi pha. . Cho 175ml nước chín để nguội vào ly (khoảng 37°C), từ từ cho vào ly 3 muỗng gạt ngang (muỗng có sẵn trong hộp), khuấy cho tan đều. . Uống ngay sau khi pha. Nếu không uống ngay, nên đậy kín cho vào tủ lạnh ở 2° - 4°C và dùng trong vòng 24 giờ.')
GO
INSERT [dbo].[product] ([product_id], [active], [listed_price], [name], [no_sold], [selling_price], [stock], [fk_brand_id], [description]) VALUES (4, 1, 1085000, N'Thực phẩm dinh dưỡng y học cho trẻ 1-10 tuổi: Pediasure vani 1', 31, 1085000, NULL, 4, N'Hướng dẫn sử dụng
. Để có 225 ml PediaSure BA pha chuẩn, cho 190ml nước chín để nguội (≤ 37 độ C) vào ly.
. Vừa cho từ từ 5 muỗng gạt ngang bột PediaSure BA (muỗng có sẵn trong hộp) vừa khuấy cho tan đều.
. Khi pha đúng theo hướng dẫn, 1ml PediaSure BA cung cấp 1 kcal hoặc 4.18 KJ.
. Sữa vừa pha dùng ngay hay đậy kín, cho vào tủ lạnh và dùng trong vòng 24 giờ.
. Để bổ sung dinh dưỡng: 2 ly/ngày (trẻ 1 - 8 tuổi), 2-3 ly/ngày (trẻ 9 - 10 tuổi) hoặc theo hướng dẫn của chuyên viên dinh dưỡng.
. Không dùng lò vi sóng để hâm nóng sữa.
Hướng dẫn bảo quản
. Bảo quản hộp chưa mở ở nhiệt độ phòng.
. Hộp đã mở phải được đậy kín và bảo quản ở nơi khô mát (nhưng không cho vào tủ lạnh) và sử dụng trong vòng 3 tuần.
. PediaSure vừa pha phải được dùng ngay hay đậy kín, cho vào tủ lạnh và dùng trong vòng 24 giờ.')
GO
INSERT [dbo].[product] ([product_id], [active], [listed_price], [name], [no_sold], [selling_price], [stock], [fk_brand_id], [description]) VALUES (5, 1, 775000, N'Sữa Enfamil A2 NeuroPro số 2 800g (Follow Up Formula, 6 - 12 tháng tuổi)', 25, 775000, NULL, 1, N'Sức khỏe của trẻ tùy thuộc vào sự tuân thủ chặt chẽ các hướng dẫn sau đây:
Vệ sinh, chuẩn bị dụng cụ, pha chế, sử dụng và bảo quản đúng cách rất quan trọng trong quá trình pha chế cho trẻ. Sản phẩm không vô trùng và không nên dùng cho trẻ sinh non hoặc trẻ nhỏ có vấn đề về miễn dịch trừ khi có chỉ định và có sự giám sát của bác sĩ. Nên hỏi ý kiến bác sĩ để biết loại sản phẩm phù hợp với con bạn.
. Bước 1: Rửa tay sạch bằng xà phòng và nước trước khi pha.
. Bước 2: Đun các dụng cụ, cốc và nắp trong nước sôi (đun sôi trong 1 phút).
. Bước 3: Đun sôi nước trong 1 phút. Để nước nguội đến nhiệt độ không quá 35-40°C . trước khi pha.
. Bước 4: Cho đúng lượng nước cần dùng vào dung cụ pha. Cho sản phẩm vào. Đậy nắp dụng cụ và lắc đều.
Hướng dẫn bảo quản        
. Bảo quản sữa bột ở nơi mát, khô ráo trước và sau khi mở.
. Dùng sản phẩm trong 30 ngày kể từ khi mở nắp.')
GO
INSERT [dbo].[product] ([product_id], [active], [listed_price], [name], [no_sold], [selling_price], [stock], [fk_brand_id], [description]) VALUES (7, 1, 1219000, N'Sữa Enfamil Enspire Infant Formula 850g (0-12 tháng)', 11, 1219000, NULL, 1, N'HƯỚNG DẪN CÁCH PHA
Sức khỏe của trẻ tùy thuộc vào sự tuân thủ chặt chẽ các hướng dẫn sau đây. Vệ sinh, chuẩn bị dụng cụ, pha chế, sử dụng và bảo quản đúng cách rất quan trọng trong quá trình pha chế cho trẻ. Sản phẩm không vô trùng và không nên dùng cho trẻ sinh non hoặc trẻ nhỏ có vấn đề về miễn dịch trừ khi có chỉ định và có sự giám sát của bác sĩ. Nên hỏi ý kiến bác sĩ để biết loại sản phẩm phù hợp với con bạn.
. Rửa tay sạch bằng xà phòng và nước trước khi pha.
. Đun các dụng cụ, cốc và nắp trong nước sôi (đun sôi trong 1 phút.
. Đun sôi nước trong 1 phút. Để nước nguội đến nhiệt độ không quá 35-40°C trước khi pha.
. Cho đúng lượng nước bạn cần vào dung cụ pha. Cho sản phẩm vào. Đậy nắp dụng cụ và lắc đều.')
GO
SET IDENTITY_INSERT [dbo].[product] OFF
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (1, 1)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (1, 9)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (1, 16)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (2, 1)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (2, 9)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (2, 16)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (3, 1)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (3, 9)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (3, 16)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (4, 1)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (4, 9)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (4, 15)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (4, 16)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (5, 1)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (5, 9)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (5, 14)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (7, 1)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (7, 9)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (7, 14)
GO
SET IDENTITY_INSERT [dbo].[product_image] ON 
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (1, N'enfamil-a-so-4-1700g-2flex.png', 1)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (2, N'enfamil-a-so-4-1700g-2flex2.png', 1)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (3, N'enfamil-a-so-4-1700g-2flex3.png', 1)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (4, N'sua-similac-5g-so-4-900g-2-6-tuoi.png', 2)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (5, N'sua-similac-5g-so-4-900g-2-6-tuoi.jpg', 2)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (6, N'sua-similac-5g-so-4-900g-2-6-tuoi3.jpg', 2)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (7, N'abbott-grow-4-huong-vani-900g.jpg', 3)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (8, N'abbott-pediasure-huong-vani-1-10-tuoi-1-6kg.png', 4)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (9, N'enfamil-aii-neuropro-2-follow-up-formula-6-12-thang-tuoi-800g.png', 5)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (10, N'enfamil-aii-neuropro-2-follow-up-formula-6-12-thang-tuoi-800g2.png', 5)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (11, N'enfamil-enspire-infant-formula-0-12-thang-tuoi-850g-hop-giay.png', 7)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (12, N'enfamil-enspire-infant-formula-0-12-thang-tuoi-850g-hop-giay.jpg', 7)
GO
SET IDENTITY_INSERT [dbo].[product_image] OFF
GO
INSERT [dbo].[user] ([username], [city], [district], [mail], [name], [password], [phone], [point], [role], [street], [ward]) VALUES (N'fdaf', N'f', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
GO
SET IDENTITY_INSERT [dbo].[voucher] ON 
GO
INSERT [dbo].[voucher] ([voucher_id], [active], [description], [discount_price], [discount_rate], [expiry_date], [title], [type], [valid_max_discount], [valid_min_price], [limit], [applied_count]) VALUES (1, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
GO
SET IDENTITY_INSERT [dbo].[voucher] OFF
GO
ALTER TABLE [dbo].[article_image]  WITH CHECK ADD  CONSTRAINT [FK8a1gd0i2pxxtg14d550nnqfgq] FOREIGN KEY([fk_article_id])
REFERENCES [dbo].[article] ([article_id])
GO
ALTER TABLE [dbo].[article_image] CHECK CONSTRAINT [FK8a1gd0i2pxxtg14d550nnqfgq]
GO
ALTER TABLE [dbo].[brand_specializing]  WITH CHECK ADD  CONSTRAINT [FKkq3xhbbxl6s1x063yo8a82b2y] FOREIGN KEY([fk_brand_id])
REFERENCES [dbo].[brand] ([brand_id])
GO
ALTER TABLE [dbo].[brand_specializing] CHECK CONSTRAINT [FKkq3xhbbxl6s1x063yo8a82b2y]
GO
ALTER TABLE [dbo].[brand_specializing]  WITH CHECK ADD  CONSTRAINT [FKmjt2yky0owigj68cue50kngf8] FOREIGN KEY([fk_category_id])
REFERENCES [dbo].[category] ([category_id])
GO
ALTER TABLE [dbo].[brand_specializing] CHECK CONSTRAINT [FKmjt2yky0owigj68cue50kngf8]
GO
ALTER TABLE [dbo].[category]  WITH CHECK ADD  CONSTRAINT [FK4wqwi3wgsrq5kka9k94vc5u2i] FOREIGN KEY([parent_category_id])
REFERENCES [dbo].[category] ([category_id])
GO
ALTER TABLE [dbo].[category] CHECK CONSTRAINT [FK4wqwi3wgsrq5kka9k94vc5u2i]
GO
ALTER TABLE [dbo].[gift_including]  WITH CHECK ADD  CONSTRAINT [FKkh4jojjosp8irpayxb8l2bcuo] FOREIGN KEY([fk_order_id])
REFERENCES [dbo].[order] ([order_id])
GO
ALTER TABLE [dbo].[gift_including] CHECK CONSTRAINT [FKkh4jojjosp8irpayxb8l2bcuo]
GO
ALTER TABLE [dbo].[gift_including]  WITH CHECK ADD  CONSTRAINT [FKp4rj10xaruf0q7f6quhfd6cv] FOREIGN KEY([fk_gift_id])
REFERENCES [dbo].[gift] ([gift_id])
GO
ALTER TABLE [dbo].[gift_including] CHECK CONSTRAINT [FKp4rj10xaruf0q7f6quhfd6cv]
GO
ALTER TABLE [dbo].[order]  WITH CHECK ADD  CONSTRAINT [FK6qo642r76jqjtkrtj4enjkppa] FOREIGN KEY([fk_voucher_id])
REFERENCES [dbo].[voucher] ([voucher_id])
GO
ALTER TABLE [dbo].[order] CHECK CONSTRAINT [FK6qo642r76jqjtkrtj4enjkppa]
GO
ALTER TABLE [dbo].[order]  WITH CHECK ADD  CONSTRAINT [FK9ku5nhw4i7u3hvycqfxvh7tb7] FOREIGN KEY([fk_username])
REFERENCES [dbo].[user] ([username])
GO
ALTER TABLE [dbo].[order] CHECK CONSTRAINT [FK9ku5nhw4i7u3hvycqfxvh7tb7]
GO
ALTER TABLE [dbo].[order_detail]  WITH CHECK ADD  CONSTRAINT [FK3k2vheutpmjpg5f0vf8hhpgy6] FOREIGN KEY([fk_order_id])
REFERENCES [dbo].[order] ([order_id])
GO
ALTER TABLE [dbo].[order_detail] CHECK CONSTRAINT [FK3k2vheutpmjpg5f0vf8hhpgy6]
GO
ALTER TABLE [dbo].[order_detail]  WITH CHECK ADD  CONSTRAINT [FKmco05w5raenuug5jxlsunx43g] FOREIGN KEY([fk_product_id])
REFERENCES [dbo].[product] ([product_id])
GO
ALTER TABLE [dbo].[order_detail] CHECK CONSTRAINT [FKmco05w5raenuug5jxlsunx43g]
GO
ALTER TABLE [dbo].[product]  WITH CHECK ADD  CONSTRAINT [FK8l1vkedog55j0f097v8ng695i] FOREIGN KEY([fk_brand_id])
REFERENCES [dbo].[brand] ([brand_id])
GO
ALTER TABLE [dbo].[product] CHECK CONSTRAINT [FK8l1vkedog55j0f097v8ng695i]
GO
ALTER TABLE [dbo].[product_category]  WITH CHECK ADD  CONSTRAINT [FKcpnk1wln754c9op1x8c0garf9] FOREIGN KEY([fk_product_id])
REFERENCES [dbo].[product] ([product_id])
GO
ALTER TABLE [dbo].[product_category] CHECK CONSTRAINT [FKcpnk1wln754c9op1x8c0garf9]
GO
ALTER TABLE [dbo].[product_category]  WITH CHECK ADD  CONSTRAINT [FKidvj2juyydg8dr2gwtqqhdhqs] FOREIGN KEY([fk_category_id])
REFERENCES [dbo].[category] ([category_id])
GO
ALTER TABLE [dbo].[product_category] CHECK CONSTRAINT [FKidvj2juyydg8dr2gwtqqhdhqs]
GO
ALTER TABLE [dbo].[product_featuring]  WITH CHECK ADD  CONSTRAINT [FK6t3lkxmmkrvivi3f7wu7m4fiq] FOREIGN KEY([fk_article_id])
REFERENCES [dbo].[article] ([article_id])
GO
ALTER TABLE [dbo].[product_featuring] CHECK CONSTRAINT [FK6t3lkxmmkrvivi3f7wu7m4fiq]
GO
ALTER TABLE [dbo].[product_featuring]  WITH CHECK ADD  CONSTRAINT [FKr04y9uj5dpcb6ibyirv46v0h1] FOREIGN KEY([fk_product_id])
REFERENCES [dbo].[product] ([product_id])
GO
ALTER TABLE [dbo].[product_featuring] CHECK CONSTRAINT [FKr04y9uj5dpcb6ibyirv46v0h1]
GO
ALTER TABLE [dbo].[product_image]  WITH CHECK ADD  CONSTRAINT [FK2y0xy28qlckjwd2sdb4cewyyx] FOREIGN KEY([fk_product_id])
REFERENCES [dbo].[product] ([product_id])
GO
ALTER TABLE [dbo].[product_image] CHECK CONSTRAINT [FK2y0xy28qlckjwd2sdb4cewyyx]
GO
ALTER TABLE [dbo].[product_review]  WITH CHECK ADD  CONSTRAINT [FKduufeqmi8ny3yxqmyykma6p9e] FOREIGN KEY([fk_username])
REFERENCES [dbo].[user] ([username])
GO
ALTER TABLE [dbo].[product_review] CHECK CONSTRAINT [FKduufeqmi8ny3yxqmyykma6p9e]
GO
ALTER TABLE [dbo].[product_review]  WITH CHECK ADD  CONSTRAINT [FKsx6t4o2lr49krtxo8bikelhpv] FOREIGN KEY([fk_product_id])
REFERENCES [dbo].[product] ([product_id])
GO
ALTER TABLE [dbo].[product_review] CHECK CONSTRAINT [FKsx6t4o2lr49krtxo8bikelhpv]
GO
ALTER TABLE [dbo].[voucher_availability]  WITH CHECK ADD  CONSTRAINT [FK8fcv7qw01sloef2a5iichf2a0] FOREIGN KEY([fk_voucher_id])
REFERENCES [dbo].[voucher] ([voucher_id])
GO
ALTER TABLE [dbo].[voucher_availability] CHECK CONSTRAINT [FK8fcv7qw01sloef2a5iichf2a0]
GO
ALTER TABLE [dbo].[voucher_availability]  WITH CHECK ADD  CONSTRAINT [FKir865vdpm1p29f4bav76kmnat] FOREIGN KEY([fk_username])
REFERENCES [dbo].[user] ([username])
GO
ALTER TABLE [dbo].[voucher_availability] CHECK CONSTRAINT [FKir865vdpm1p29f4bav76kmnat]
GO
USE [master]
GO
ALTER DATABASE [LittleLoveLy] SET  READ_WRITE 
GO
