USE [master]
GO
/****** Object:  Database [LittleLoveLy]    Script Date: 2024-06-04 10:09:17 AM ******/
CREATE DATABASE [LittleLoveLy]
EXEC [LittleLoveLy].[dbo].[sp_fulltext_database] @action = 'enable'
GO
ALTER DATABASE [LittleLoveLy] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [LittleLoveLy] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [LittleLoveLy] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [LittleLoveLy] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [LittleLoveLy] SET ARITHABORT OFF 
GO
ALTER DATABASE [LittleLoveLy] SET AUTO_CLOSE ON 
GO
ALTER DATABASE [LittleLoveLy] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [LittleLoveLy] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [LittleLoveLy] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [LittleLoveLy] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [LittleLoveLy] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [LittleLoveLy] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [LittleLoveLy] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [LittleLoveLy] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [LittleLoveLy] SET  ENABLE_BROKER 
GO
ALTER DATABASE [LittleLoveLy] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [LittleLoveLy] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [LittleLoveLy] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [LittleLoveLy] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [LittleLoveLy] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [LittleLoveLy] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [LittleLoveLy] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [LittleLoveLy] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [LittleLoveLy] SET  MULTI_USER 
GO
ALTER DATABASE [LittleLoveLy] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [LittleLoveLy] SET DB_CHAINING OFF 
GO
ALTER DATABASE [LittleLoveLy] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [LittleLoveLy] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [LittleLoveLy] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [LittleLoveLy] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [LittleLoveLy] SET QUERY_STORE = ON
GO
ALTER DATABASE [LittleLoveLy] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [LittleLoveLy]
GO
/****** Object:  Table [dbo].[article]    Script Date: 2024-06-04 10:09:17 AM ******/
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
/****** Object:  Table [dbo].[article_image]    Script Date: 2024-06-04 10:09:17 AM ******/
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
/****** Object:  Table [dbo].[brand]    Script Date: 2024-06-04 10:09:17 AM ******/
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
/****** Object:  Table [dbo].[brand_specializing]    Script Date: 2024-06-04 10:09:17 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[brand_specializing](
	[fk_brand_id] [bigint] NOT NULL,
	[fk_category_id] [bigint] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[category]    Script Date: 2024-06-04 10:09:17 AM ******/
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
/****** Object:  Table [dbo].[gift]    Script Date: 2024-06-04 10:09:17 AM ******/
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
/****** Object:  Table [dbo].[gift_including]    Script Date: 2024-06-04 10:09:17 AM ******/
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
/****** Object:  Table [dbo].[order]    Script Date: 2024-06-04 10:09:17 AM ******/
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
/****** Object:  Table [dbo].[order_detail]    Script Date: 2024-06-04 10:09:17 AM ******/
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
/****** Object:  Table [dbo].[product]    Script Date: 2024-06-04 10:09:17 AM ******/
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
/****** Object:  Table [dbo].[product_category]    Script Date: 2024-06-04 10:09:17 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[product_category](
	[fk_product_id] [bigint] NOT NULL,
	[fk_category_id] [bigint] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[product_featuring]    Script Date: 2024-06-04 10:09:17 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[product_featuring](
	[fk_article_id] [bigint] NOT NULL,
	[fk_product_id] [bigint] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[product_image]    Script Date: 2024-06-04 10:09:17 AM ******/
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
/****** Object:  Table [dbo].[product_review]    Script Date: 2024-06-04 10:09:17 AM ******/
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
/****** Object:  Table [dbo].[user]    Script Date: 2024-06-04 10:09:17 AM ******/
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
/****** Object:  Table [dbo].[voucher]    Script Date: 2024-06-04 10:09:17 AM ******/
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
/****** Object:  Table [dbo].[voucher_availability]    Script Date: 2024-06-04 10:09:17 AM ******/
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
INSERT [dbo].[brand] ([brand_id], [logo], [name]) VALUES (34, NULL, N'KUN')
GO
INSERT [dbo].[brand] ([brand_id], [logo], [name]) VALUES (35, NULL, N'Huggies')
GO
INSERT [dbo].[brand] ([brand_id], [logo], [name]) VALUES (36, NULL, N'Gerber')
GO
INSERT [dbo].[brand] ([brand_id], [logo], [name]) VALUES (37, NULL, N'Grinny')
GO
INSERT [dbo].[brand] ([brand_id], [logo], [name]) VALUES (38, NULL, N'SG Food')
GO
INSERT [dbo].[brand] ([brand_id], [logo], [name]) VALUES (39, NULL, N'Cây Thị')
GO
INSERT [dbo].[brand] ([brand_id], [logo], [name]) VALUES (40, NULL, N'Thuyền Xưa')
GO
INSERT [dbo].[brand] ([brand_id], [logo], [name]) VALUES (41, NULL, N'Haribo')
GO
INSERT [dbo].[brand] ([brand_id], [logo], [name]) VALUES (42, NULL, N'Glico')
GO
INSERT [dbo].[brand] ([brand_id], [logo], [name]) VALUES (43, NULL, N'Lotte')
GO
INSERT [dbo].[brand] ([brand_id], [logo], [name]) VALUES (44, NULL, N'Zott')
GO
INSERT [dbo].[brand] ([brand_id], [logo], [name]) VALUES (45, NULL, N'Gluck')
GO
INSERT [dbo].[brand] ([brand_id], [logo], [name]) VALUES (46, NULL, N'Edison')
GO
INSERT [dbo].[brand] ([brand_id], [logo], [name]) VALUES (47, NULL, N'Comotomo')
GO
INSERT [dbo].[brand] ([brand_id], [logo], [name]) VALUES (48, NULL, N'Animo')
GO
INSERT [dbo].[brand] ([brand_id], [logo], [name]) VALUES (49, NULL, N'Autoru')
GO
INSERT [dbo].[brand] ([brand_id], [logo], [name]) VALUES (50, NULL, N'Senka')
GO
INSERT [dbo].[brand] ([brand_id], [logo], [name]) VALUES (51, NULL, N'Lactacyd')
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
INSERT [dbo].[product] ([product_id], [active], [listed_price], [name], [no_sold], [selling_price], [stock], [fk_brand_id], [description]) VALUES (8, 1, 265000, N'Sữa Similac Neosure 370g (0-12 tháng)', 10, 265000, NULL, 2, N'Độ tuổi phù hợp        Trẻ sinh non, nhẹ cân từ 0-12 tháng
Hướng dẫn sử dụng        . Dùng nước đã được đun sôi trong vòng 5 phút và để nguội (37ºC) để pha chế theo hướng dẫn.
. Chỉ dùng muỗng có sẵn trong hộp để lường Similac Neosure IQ.
. Lượng pha dư hơn 1 lần uống phải bảo quản trong tủ lạnh ở 2 - 4ºC không quá 24 giờ.
. Cách pha chuẩn: một muỗng gạt ngang Similac NeoSure IQ pha với 60ml nước, hoặc 145g bột trong mỗi lít nước, 30ml sữa cung cấp 22kcal.
Hướng dẫn bảo quản        . Bảo quản hộp chưa mở ở nhiệt độ phòng.
. Khi hộp đã mở, nên sử dụng trong vòng 3 tuần.
. Đậy nắp và bảo quản nơi khô mát (không để trong tủ lạnh).
. Không dùng lò vi sóng để pha hay hâm nóng vì có thể gây bỏng nặng.')
GO
INSERT [dbo].[product] ([product_id], [active], [listed_price], [name], [no_sold], [selling_price], [stock], [fk_brand_id], [description]) VALUES (9, 1, 329000, N'Sữa Abbott Grow 2 900g (6-12 tháng)', 5, 329000, NULL, 3, N'Tỷ lệ pha gợi ý
. Một muỗng gạt ngang (10,3 g) Abbott Grow 2 (muỗng có sẵn trong hộp) dùng pha với 60ml nước. 
. Trẻ từ 6 tháng trở lên pha mỗi lần 3 muỗng với 180ml nước, mỗi ngày uống từ 5 đến 6 lần.')
GO
INSERT [dbo].[product] ([product_id], [active], [listed_price], [name], [no_sold], [selling_price], [stock], [fk_brand_id], [description]) VALUES (10, 1, 995000, N'Sữa Enfagrow A+ số 3 1700g (1-3 tuổi) 2Flex', 7, 995000, NULL, 1, N'Enfamil A+ số 3 là sữa bột công thức dành riêng cho trẻ từ 1 đến 3 tuổi
Lưu ý
. Sữa mẹ là thức ăn tốt nhất cho sức khỏe và sự phát triển toàn diện của trẻ nhỏ. Các yếu tố chống nhiễm khuẩn, đặc biệt là kháng thể chỉ có trong sữa mẹ có tác dụng giúp trẻ phòng, chống bệnh tiêu chảy, nhiễm khuẩn đường hô hấp và một số bệnh nhiễm khuẩn khác. 
. Chỉ sử dụng sản phẩm này theo hướng dẫn của bác sĩ. Pha chế theo đúng hướng dẫn. Cho trẻ ăn bằng cốc, thìa hợp vệ sinh.')
GO
INSERT [dbo].[product] ([product_id], [active], [listed_price], [name], [no_sold], [selling_price], [stock], [fk_brand_id], [description]) VALUES (11, 1, 455000, N'Sữa bầu Similac Mom 900g hương Vani', 15, 455000, NULL, 2, N'Sữa bầu Similac Mom 900g hương Vani')
GO
INSERT [dbo].[product] ([product_id], [active], [listed_price], [name], [no_sold], [selling_price], [stock], [fk_brand_id], [description]) VALUES (12, 1, 529000, N'Sữa Meiji Infant Formula 800g (0-12 tháng)', 30, 529000, NULL, 5, N'Sữa Meiji Infant Formula 800g (0-12 tháng) là sữa bột công thức được nhập khẩu chính hãng từ Nhật Bản. Sản phẩm dành cho trẻ sơ sinh từ 0 - 12 tháng tuổi.')
GO
INSERT [dbo].[product] ([product_id], [active], [listed_price], [name], [no_sold], [selling_price], [stock], [fk_brand_id], [description]) VALUES (13, 1, 579000, N'Sữa Morinaga số 1 850g (Hagukumi, 0-6 tháng)
', 11, 579000, NULL, 6, N'Hướng dẫn sử dụng        .Rừa tay và các dụng cụ pha bằng nước và xà phòng thật kỹ.
.Khử trùng bằng cách đun sôi các dụng cụ pha trong vòng 5 đến 10 phút, để ráo nước.
.Lấy chính xác lượng bột cần pha bằng muỗng đi kèm trong hộp, cho vào dụng cụ pha đã khử trùng.
.Cho khoảng 2/3 lượng nước cần thiết vào dụng cụ pha (nước đun sôi để nguội xuống còn khoảng 70 độ C. Chú ý bị bỏng vì nước nóng sẽ làm cho dụng cụ pha nóng lên. Vặn chặt nắp dụng cụ pha, sau đó lắc đều cho tan bột).
.Tháo nắp dụng cụ pha ra, đổ thêm nước nóng khoảng 70 độ C vào.
.Lưu ý điều chỉnh vừa đủ tới lượng cần pha. Vặn chặt nắp dụng cụ pha, lắc nhẹ để hòa tan. Cho dụng cụ pha vào dòng nước chảy hoặc bát nước nguội để làm nguội xuống đến nhiệt độ cơ thể và cho bé bú.
Hướng dẫn bảo quản        Để các dụng cụ pha, kể cả muỗng lường ở nơi khô ráo và sạch sẽ. Sau mỗi lần sử dụng, đậy thật chặt nắp hộp và bảo quản nơi khô ráo, thoát mát để sản phẩm không bị bụi và nhiễm khuẩn. Không bảo quản trong tủ lạnh. Sau khi mở hộp, nên sử dụng hết trong vòng 1 tháng.')
GO
INSERT [dbo].[product] ([product_id], [active], [listed_price], [name], [no_sold], [selling_price], [stock], [fk_brand_id], [description]) VALUES (14, 1, 465000, N'Sữa Meiji Growing up Formula 800g (12-36 tháng)', 15, 465000, NULL, 5, N'Hướng dẫn sử dụng        - Rửa tay trước khi pha.
- Đảm bảo các đồ dùng và thiết bị sạch sẽ và được tiệt trùng trong nước sôi.
- Sử dụng muỗng kèm trong hộp để lấy chính xác lượng bột cần thiết và đổ vào bình đã được tiệt trùng.
- Đổ nước nóng (50 độ C) vào bình khoảng 2/3 tổng khối lượng nước được chỉ định.
- Đóng nắp bình và lắc nhẹ đến khi bột tan hoàn toàn.
- Cho thêm nước sôi cho đủ khối lượng nước được chỉ định rồi lắc nhẹ.
- Để nguội xuống còn tầm 38 độ thì cho bé uống.
- Nếu muốn làm nguội nhanh, bạn có thể cho bình ngâm trong bát nước lạnh.
- Trước khi cho bé dùng, hãy kiểm tra nhiệt độ để tránh bỏng vòm họng của bé, nếu như nhỏ một vài giọt ra cổ tay mà chỉ còn âm ấm là có thể cho bé dùng được.
Hướng dẫn bảo quản        - Đậy kín nắp hộp sau khi mở và để ở nơi mát, khô ráo.
- Không nên cho sản phẩm vào tủ lạnh.
- Nên sử dụng trong vòng 4 tuần từ khi mở sản phẩm')
GO
INSERT [dbo].[product] ([product_id], [active], [listed_price], [name], [no_sold], [selling_price], [stock], [fk_brand_id], [description]) VALUES (15, 1, 455000, N'Sữa Wakodo MOM 830g', 32, 455000, NULL, 7, N'Cảnh báo        . Sử dụng sản phẩm ngay sau khi pha.
. Luôn sử dụng muỗng lường trong lon.
. Rửa sạch và lau khô muỗng lường sau khi sử dụng và để lại trong lon.
. Cẩn thận không để nước rơi vào bên trong lon, bột có thể bị vón cục khi tiếp xúc với nước.
Hướng dẫn sử dụng        Luôn pha ở nơi sạch sẽ. Rửa tay và dụng cụ thật sạch trước khi pha bằng chiếc muỗng có sẵn trong lon. Sử dụng nước sạch để pha.. Bước 1: Cho 180ml nước chín hoặc chín ấm vào ly.
. Bước 2: Cho 5 muỗng bột gạt ngang vào ly.
. Bước 3: Khuấy đều tan hoàn toàn.
Hướng dẫn bảo quản        . Trước khi sử dụng, bảo quản nơi khô ráo, thoáng mát.
. Sau khi sử dụng, đóng kín nắp lon và để nơi khô ráo, thoáng mát, sạch sẽ.
. Nên dùng sản phẩm trước hạn sử dụng và sử dụng trong vòng 1 tháng sau khi mở nắp lon.
. Không lưu trữ trong tủ lạnh.')
GO
INSERT [dbo].[product] ([product_id], [active], [listed_price], [name], [no_sold], [selling_price], [stock], [fk_brand_id], [description]) VALUES (16, 1, 219000, N'Sữa bầu Meiji mama 350g', 17, 219000, NULL, 5, N'Hướng dẫn bảo quản        . Đậy kín sau mỗi lần sử dụng. Đảm bảo muỗng lường khô ráo rồi đặt lại vào hộp. Sau khi mở nắp')
GO
INSERT [dbo].[product] ([product_id], [active], [listed_price], [name], [no_sold], [selling_price], [stock], [fk_brand_id], [description]) VALUES (17, 1, 419000, N'Sữa Vinamilk Yoko Gold 3 850g (2-6 tuổi)', 15, 419000, NULL, 8, N'Hướng dẫn sử dụng        . Rửa tay và dụng cụ pha chế thật sạch.
. Đun sôi dụng cụ pha chế trong khoảng 10 phút trước khi sử dụng.
. Đun nước sôi khoảng 5 phút. Sau đó để nguội đến khoảng 50oC.
. Rót nước vào dụng cụ pha chế theo lượng hướng dẫn .
. Cho sản phẩm theo số muỗng tương ứng với lượng nước như bảng hướng dẫn.
. Lắc nhẹ hoặc khuấy đều cho đến khi bột tan hoàn toàn.
. Làm nguội nhanh và kiểm tra nhiệt độ bằng cách nhỏ vài giọt lên cổ tay. Nếu thấy độ ấm vừa đủ, cho trẻ dùng ngay.
Hướng dẫn bảo quản        . Đậy kín sau mỗi lần sử dụng.
. Để nơi thoáng mát và khô ráo.
. Không bảo quản trong tủ lạnh.
. Nên sử dụng trong vòng 3 tuần sau khi mở bao bì.
Lưu ý:
. Chỉ dùng tối đa trong vòng 1 giờ và phần dư phải đổ bỏ.
. Chỉ sử dụng muỗng có trong hộp
. Pha đúng lượng như hướng dẫn.
. Sử dụng ít hoặc nhiều hơn có thể làm ảnh hưởng đến sức khỏe trẻ.')
GO
INSERT [dbo].[product] ([product_id], [active], [listed_price], [name], [no_sold], [selling_price], [stock], [fk_brand_id], [description]) VALUES (18, 1, 1069000, N'Sữa Bellamy''s Organic Junior Milk Drink số 4 900g (trên 3 tuổi)
', 31, 1069000, NULL, 9, N'Hướng dẫn sử dụng        . Luôn rửa tay trước khi pha sữa.
. Vệ sinh dụng cụ pha thật kỹ, tiệt trùng bằng cách đun 5 phút trong nước sôi.
. Đun sôi nước sạch và để nguội cho đến khi nhiệt độ giảm xuống 50 – 60 độ C.
. Chỉ sử dụng muỗng đi kèm với hộp sữa để pha.
. Múc đầy một muỗng bột bằng cách gạt muỗng trên thành hộp.
. Luôn pha theo tỷ lệ 1 muỗng bột gạt ngang (tương đương 8,6 g) với mỗi 50 ml nước.
. Cho 4 muỗng sữa bột gạt ngang (tương đương 34,4 g) vào 200 ml nước đã đun sôi để nguội 50 – 60 độ C.
. Khuấy hoặc lắc cho đến khi bột tan đều, dùng ngay sau khi pha. Nếu không dùng hết, bảo quản phần sữa đã pha trong tủ lạnh và sử dụng trong vòng 24 giờ.
Hướng dẫn bảo quản        . Bảo quản ở nơi khô ráo, thoáng mát.
. Luôn đậy kín nắp hộp và sử dụng hết trong vòng 4 tuần sau khi mở hộp.
. Sử dụng trước ngày hết hạn in dưới đáy hộp.')
GO
INSERT [dbo].[product] ([product_id], [active], [listed_price], [name], [no_sold], [selling_price], [stock], [fk_brand_id], [description]) VALUES (19, 1, 359000, N'Sữa Dielac Grow Plus 2+, 2-10 tuổi, 850g', 16, 359000, NULL, 8, N'Hướng dẫn sử dụng        . Rửa tay và dụng cụ pha chế thật sạch.
. Đun sôi dụng cụ pha chế trong khoảng 10 phút trước khi sử dụng.
.Đun nước sôi khoảng 5 phút. Sau đó để nguội đến khoảng 50˚C. Rót nước vào dụng cụ pha chế theo lượng hướng dẫn. Cho sản phẩm theo số muỗng tương ứng với lượng nước như bảng hướng dẫn. Lắc nhẹ hoặc khuấy đều cho đến khi bột tan hoàn toàn.
.Làm nguội nhanh và kiểm tra nhiệt độ bằng cách nhỏ vài giọt lên cổ tay. Nếu thấy độ ấm vừa đủ thì cho bé dùng ngay.
Hướng dẫn bảo quản        . Đậy kín sau mỗi lần sử dụng.. Để nơi thoáng mát và khô ráo.. Không bảo quản trong tủ lạnh.. Nên sử dụng trong vòng 4 tuần sau khi mở bao bì.')
GO
INSERT [dbo].[product] ([product_id], [active], [listed_price], [name], [no_sold], [selling_price], [stock], [fk_brand_id], [description]) VALUES (20, 1, 499000, N'Sữa ColosBaby Gold 2+ 800g (Trên 2 tuổi)', 35, 499000, NULL, 10, N'Hướng dẫn sử dụng        . Rửa tay và tiệt trùng dụng cụ pha chế thật sạch trước khi pha.
. Đun nước sôi và để nguội đến nhiệt độ thích hợp.
. Đổ nước đun sôi đã để nguội vào cốc/bình với lượng nước chính xác.
. Lấy chính xác lượng sữa cần pha bằng thìa chuyên dụng đi kèm trong hộp.
. Lắc nhẹ hoặc khuấy đều đến khi tan hoàn toàn.
. Kiểm tra nhiệt độ trước khi bé sử dụng bằng cách nhỏ một giọt lên tay.
. Dùng ngay hoặc tối đa 1 giờ sau khi pha.
. Cho trẻ ăn bằng cốc, thìa hợp vệ sinh.
. Không cho bé uống hoặc ăn lại phần thừa.
Hướng dẫn bảo quản        
. Bảo quản sữa nơi khô ráo, thoáng mát, sạch sẽ, tránh ánh nắng mặt trời trực tiếp.
. Lon sữa đã mở phải được đậy kín và sử dụng hết trong vòng 3 tuần.')
GO
INSERT [dbo].[product] ([product_id], [active], [listed_price], [name], [no_sold], [selling_price], [stock], [fk_brand_id], [description]) VALUES (21, 1, 605000, N'Sữa bột Vinamilk Kenko Haru hộp 850g', 30, 605000, NULL, 8, N'Độ tuổi phù hợp        . Người lớn, ăn uống kém, cần bổ sung dinh dưỡng. Người cần phục hồi sức khỏe sau ốm
Hướng dẫn sử dụng        . Rửa tay và dụng cụ thật sạch trước khi pha.
. Để pha 230ml sản phẩm, cho từ từ 7 muỗng gạt ngang (khoảng 57,4g) bột) vào 185ml nước đun sôi để nguội (khoảng 50oC).
. Khuấy đều cho đến khi bột tan hoàn toàn.
Hướng dẫn bảo quản        . Đậy kín sau mỗi lần sử dụng.
. Để nơi thoáng mát và khô ráo.
. Không bảo quản trong tủ lạnh.
. Sử dụng hết trong vòng 4 tuần sau khi mở bao bì.
. Sản phẩm đã pha phải dùng ngay hoặc phải đậy kín và bảo quản trong tủ lạnh không quá 24 giờ.')
GO
INSERT [dbo].[product] ([product_id], [active], [listed_price], [name], [no_sold], [selling_price], [stock], [fk_brand_id], [description]) VALUES (22, 1, 379000, N'Sữa Colos Gain 0+ 800g (0 - 12 tháng)
', 24, 379000, NULL, 10, N'Trọng lượng sản phẩm        0.8
Hướng dẫn sử dụng        . Rửa tay và tiệt trùng dụng cụ pha chế thật sạch trước khi pha.
. Đun nước sôi và để nguội đến nhiệt độ thích hợp.
. Đổ nước đun sôi đã để nguội vào cốc/bình với lượng nước chính xác.
. Lấy chính xác lượng sữa cần pha bằng thìa chuyên dụng đi kèm trong hộp.
. Lắc nhẹ hoặc khuấy đều đến khi tan hoàn toàn.
. Kiểm tra nhiệt độ trước khi bé sử dụng bằng cách nhỏ một giọt lên tay.
. Dùng ngay hoặc tối đa 1 giờ sau khi pha.
. Cho trẻ ăn bằng cốc, thìa hợp vệ sinh.
. Không cho bé uống hoặc ăn lại phần thừa.
Hướng dẫn bảo quản        
. Bảo quản nơi khô ráo, thoáng mát, sạch sẽ, tránh ánh nắng trực tiếp.
. Lon đã mở phải được đậy kín và sử dụng hết trong vòng 3 tuần.')
GO
INSERT [dbo].[product] ([product_id], [active], [listed_price], [name], [no_sold], [selling_price], [stock], [fk_brand_id], [description]) VALUES (23, 1, 665000, N'Sữa Humana Gold Plus 1 800g (0-6 tháng)', 35, 665000, NULL, 11, N'Xuất xứ thương hiệu        Đức
Hướng dẫn sử dụng        . Đun sôi lượng nước vừa đủ, để nguội đến khoảng 50°C , sau đó rót khoảng phân nửa lượng nước cần pha vào bình sạch
. Sử dụng muỗng đong có sẵn trong hộp để lấy lượng bột cần pha theo hướng dẫn và cho vào bình
. Đậy kín nắp bình và lắc mạnh ngay để hòa tan
. Cho tiếp lượng nước còn lại vào, tiếp tục lắc mạnh cho bột hòa tan hoàn toàn
. Siết chặt nắp bình và kiểm tra lại nhiệt độ của sản phẩm đã pha (37°C) trước khi cho bé uống.
Hướng dẫn bảo quản        . Bảo quản nơi khô mát ( <25 độ C), tránh ánh nắng trực tiếp, không để gần chất cho mùi, không để trong tủ lạnh
. Đóng kín nắp sau khi sử dụng và dùng sản phẩm trong vòng 3 tuần sau khi mở nắp.')
GO
INSERT [dbo].[product] ([product_id], [active], [listed_price], [name], [no_sold], [selling_price], [stock], [fk_brand_id], [description]) VALUES (24, 1, 325000, N'Sữa HiPP Organic Combiotic số 2 350g (6-12 tháng tuổi)', 17, 325000, NULL, 12, N'Sản xuất tại        Đức
Trọng lượng sản phẩm        0.35
Hướng dẫn sử dụng        . Đun sôi nước sạch và để nguội xuống khoảng 40-50 độ C. Đổ lượng nước cần thiết vào cốc hoặc bình có vạch đo dung tích.. Cho 2/3 lượng nước đã đo từ cốc và bình khô sạch, tiếp đó cho từ từ lượng HiPP 2 Combiotic Organic theo số thìa /muỗng gạt ngang cần thiết.. Đậy nắp bình rồi lắc đều bình.. Cho nốt 1/3 lượng nước còn lại và lắc đều một lần nữa.. Kiểm tra nhiệt độ trước khi cho bé uống (khoảng 37 độ C).
Hướng dẫn bảo quản        . Bảo quản nơi khô ráo, thoáng mát ở nhiệt độ thường. Không để gần chất có mùi hay nơi thay đổi nhiệt độ đột ngột. Sản phẩm đã mở chỉ sử dụng trong vòng 03 tuần sau khi mở.')
GO
INSERT [dbo].[product] ([product_id], [active], [listed_price], [name], [no_sold], [selling_price], [stock], [fk_brand_id], [description]) VALUES (25, 1, 729000, N'Sữa NAN INFINIPRO A2 800g số 2 (1-2 tuổi)', 55, 729000, NULL, 13, N'Xuất xứ thương hiệu        Thuỵ Sỹ
Trọng lượng sản phẩm        0.8
Hướng dẫn sử dụng        
. Rửa sạch tay trước khi pha NAN INFINIPRO A2 cho trẻ

. Rửa cốc và nắp đậy thật sạch. Đun sôi trong 5 phút. Đậy kín nắp đến khi sử dụng.

. Đun sôi nước và để nguội bớt bằng với nhiệt độ của cơ thể.

. Theo sát bảng hướng dẫn cách pha trên bao bì. Đầu tiên, đổ nước ấm vào cốc. Sau đó, thêm chính xác số muỗng lường đã gạt ngang tương ứng với độ tuổi của trẻ.

. Đảm bảo muỗng lường khô ráo rồi đặt lại vào hộp. Đậy nắp kín sau mỗi lần sử dụng và bảo quản nơi khô ráo, thoáng mát.

. Đậy nắp và lắc hoặc khuấy cho đều đến khi bột được hòa tan hoàn toàn. Kiểm tra nhiệt độ trước khi cho trẻ uống.

Hướng dẫn bảo quản        . Bảo quản sản phẩm nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp.
. Sử dụng trong vòng 4 tuần sau khi mở hộp.
. Đậy kín nắp hộp sau mỗi lần sử dụng.')
GO
INSERT [dbo].[product] ([product_id], [active], [listed_price], [name], [no_sold], [selling_price], [stock], [fk_brand_id], [description]) VALUES (26, 1, 675000, N'Sữa HiPP Organic Combiotic số 4 800g (từ 3 tuổi)', 24, 675000, NULL, 12, N'Sản xuất tại        Đức
Trọng lượng sản phẩm        0.8
Hướng dẫn sử dụng        . Đun sôi nước sạch và để nguội xuống khoảng 40-50 độ C.. Đổ lượng nước cần thiết vào cốc có vạch đo dung tích.. Cho số muỗng sữa bột HiPP 4 Organic Combiotic cần thiết (Theo đúng tỷ lệ pha khuyến cáo).. Dùng thìa (muỗng) khuấy đều cho sữa tan mịn hoàn toàn. Kiểm tra nhiệt độ trước khi cho bé uống (khoảng 37 độ C).
Hướng dẫn bảo quản        . Bảo quản nơi khô ráo, thoáng mát ở nhiệt độ thường. Không để gần chất có mùi hay nơi thay đổi nhiệt độ đột ngột. Sản phẩm đã mở chỉ sử dụng trong vòng 03 tuần sau khi mở.')
GO
INSERT [dbo].[product] ([product_id], [active], [listed_price], [name], [no_sold], [selling_price], [stock], [fk_brand_id], [description]) VALUES (27, 1, 649000, N'Sữa NAN INFINIPRO A2 800g số 3 (2-6 tuổi)', 14, 649000, NULL, 13, N'Xuất xứ thương hiệu        Thuỵ Sỹ
Trọng lượng sản phẩm        0.8
Hướng dẫn sử dụng        Rửa sạch tay trước khi pha NAN INFINIPRO A2 cho trẻ
Rửa cốc và nắp đậy thật sạch. Đun sôi trong 5 phút.
Đậy kín nắp đến khi sử dụng.
Đun sôi nước và để nguội bớt bằng với nhiệt độ của cơ thể.
Theo sát bảng hướng dẫn cách pha trên bao bì.
Đầu tiên, đổ nước ấm vào cốc.
Sau đó, thêm chính xác số muỗng lường đã gạt ngang tương ứng với độ tuổi của trẻ.
Đảm bảo muỗng lường khô ráo rồi đặt lại vào hộp.
Đậy nắp kín sau mỗi lần sử dụng và bảo quản nơi khô ráo, thoáng mát.
Đậy nắp và lắc hoặc khuấy cho đều đến khi bột được hòa tan hoàn toàn. Kiểm tra nhiệt độ trước khi cho trẻ uống.
Hướng dẫn bảo quản        . Bảo quản sản phẩm nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp.
. Sử dụng trong vòng 4 tuần sau khi mở hộp.
. Đậy kín nắp hộp sau mỗi lần sử dụng.')
GO
INSERT [dbo].[product] ([product_id], [active], [listed_price], [name], [no_sold], [selling_price], [stock], [fk_brand_id], [description]) VALUES (28, 1, 615000, N'Sữa Frisolac Gold Pro số 3', 46, 615000, NULL, 14, N'Xuất xứ thương hiệu        Hà Lan
Sản xuất tại        Hà Lan
Trọng lượng sản phẩm        800g
Độ tuổi phù hợp        Dành cho bé từ 1 đến 3 tuổi
Nhà sản xuất        FrieslandCampina
Hướng dẫn bảo quản        . Luôn giữ nơi pha chế sạch sẽ và ngăn nắp.
. Đun sôi các dụng cụ pha chế ít nhất 3 phút, một lần mỗi ngày.
. Luôn giữ muỗng lường bột ở bên trong lon được khô ráo và sạch sẽ.
. Đóng kín lon sản phẩm bằng nắp nhựa.
. Bảo quản nơi khô ráo, thoáng mát. Sử dụng trong vòng 4 tuần sau khi mở nắp lon')
GO
INSERT [dbo].[product] ([product_id], [active], [listed_price], [name], [no_sold], [selling_price], [stock], [fk_brand_id], [description]) VALUES (29, 1, 365000, N'Thực phẩm dinh dưỡng y học Nutren JUNIOR 400g (1-10 tuổi)', 14, 365000, NULL, 13, N'Sản xuất tại        Thụy Sĩ
Trọng lượng sản phẩm        400g
Độ tuổi phù hợp        Cho trẻ từ 1-10 tuổi
Nhà sản xuất        Sản xuất bởi Nestle Suisse S.A. tại nhà máy Konolfingen, 3510 Konolfingen, Thụy Sĩ.
Cảnh báo        Sử dụng sản phẩm theo sự tư vấn của nhân viên y tế. Không dùng để tiêm truyền. Không sử dụng cho bé dưới 1 tuổi. Không pha thêm dược phẩm hoặc thực phẩm nào khác
Hướng dẫn sử dụng        - Rửa tay sạch và tham khảo bảng hướng dẫn pha chế.
- Đong lượng nước đun sôi để nguội vào ly.
- Dùng muỗng có sẵn trong hộp để lường khối lượng bột cần pha hoặc cân theo gam.
- Trước khi cho bột vào, hãy chắn chắn rằng nhiệt độ của nước là 45oC hoặc thấp hơn để đảm bảo các vi khuẩn có lợi còn sống. Cho bột vào nước và khuấy đều cho đến khi bột tan hết.
- Sau khi sử dụng xong để muỗng lường trên giá bên trong hộp, đậy kín hộp.
Hướng dẫn bảo quản        - Nơi khô ráo, thoáng mát.
- Chỉ sử dụng sản phẩm trong vòng 4 tuần sau khi mở hộp.
- Sản phẩm sau khi pha nên được đậy kín và sử dụng trong vòng 6 giờ nếu để ở nhiệt độ phòng, hoặc 24 giờ nếu bảo quản trong tủ lạnh.
')
GO
INSERT [dbo].[product] ([product_id], [active], [listed_price], [name], [no_sold], [selling_price], [stock], [fk_brand_id], [description]) VALUES (30, 1, 269000, N'Sữa bầu Friso Mum Gold 400g hương cam', 35, 269000, NULL, 14, N'Độ tuổi phù hợp        Dành cho mẹ mang thai và cho con bú
Hướng dẫn bảo quản        . Đậy kín nắp hộp sau khi mở và để ở nơi mát, khô ráo. Không nên cho sản phẩm vào tủ lạnh. Nên sử dụng trong vòng 4 tuần từ khi mở sản phẩm')
GO
INSERT [dbo].[product] ([product_id], [active], [listed_price], [name], [no_sold], [selling_price], [stock], [fk_brand_id], [description]) VALUES (31, 1, 539000, N'Sữa bầu Friso Mum Gold 900g hương cam', 12, 539000, NULL, 14, N'Độ tuổi phù hợp        Dành cho mẹ mang thai và cho con bú
Hướng dẫn bảo quản        . Đậy kín nắp hộp sau khi mở và để ở nơi mát, khô ráo. Không nên cho sản phẩm vào tủ lạnh. Nên sử dụng trong vòng 4 tuần từ khi mở sản phẩm')
GO
INSERT [dbo].[product] ([product_id], [active], [listed_price], [name], [no_sold], [selling_price], [stock], [fk_brand_id], [description]) VALUES (32, 1, 756000, N'Thùng Sữa uống dinh dưỡng Vinamilk Yoko Gold 180ml (Lốc 4) - 12 lốc', 57, 756000, NULL, 8, N'Dung tích        180ml/ hộp
Độ tuổi phù hợp        Cho bé từ 1 tuổi trở lên
Hướng dẫn sử dụng        Ngon hơn khi uống lạnh. Lắc đều trước khi sử dụng
Hướng dẫn bảo quản        Bảo quản nơi khô ráo và thoáng mát
Số lốc trong thùng        12 lốc/ thùng')
GO
INSERT [dbo].[product] ([product_id], [active], [listed_price], [name], [no_sold], [selling_price], [stock], [fk_brand_id], [description]) VALUES (33, 1, 696000, N'Thùng Sữa uống dinh dưỡng Optimum Gold 180ml (Lốc 4 hộp) - 12 lốc', 37, 696000, NULL, 8, NULL)
GO
INSERT [dbo].[product] ([product_id], [active], [listed_price], [name], [no_sold], [selling_price], [stock], [fk_brand_id], [description]) VALUES (34, 1, 468000, N'Thùng Sữa non Vinamilk ColosGold 110ml (từ 1 tuổi) lốc 4 hộp - 12 lốc', 50, 468000, NULL, 8, N'Xuất xứ thương hiệu        Việt Nam
Sản xuất tại        Việt Nam
Dung tích        110ml/ hộp
Độ tuổi phù hợp        Trẻ từ 1 tuổi
Nhà sản xuất        Vinamilk
Số lốc trong thùng        12 lốc/ thùng')
GO
INSERT [dbo].[product] ([product_id], [active], [listed_price], [name], [no_sold], [selling_price], [stock], [fk_brand_id], [description]) VALUES (35, 1, 390000, N'Thùng thực phẩm bổ sung Nestlé NANGROW 6 (4x180ml)', 39, 390000, NULL, 13, N'Thương hiệu        Nestlé NANGROW
Độ tuổi phù hợp        Không dùng cho trẻ dưới 12 tháng tuổi
Cảnh báo        Không dùng cho người dị ứng với đạm sữa bò, không dung nạp đường lactose. Không dùng cho trẻ em dưới 12 tháng tuổi
Hướng dẫn sử dụng        Sản phẩm cho 1 lần sử dụng. Không giữ lại phần thừa.
Hướng dẫn bảo quản        Bảo quản nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp.')
GO
INSERT [dbo].[product] ([product_id], [active], [listed_price], [name], [no_sold], [selling_price], [stock], [fk_brand_id], [description]) VALUES (36, 1, 684000, N'Thùng thực phẩm bổ sung Similac hương vani 110ml (Lốc 4 hộp)', 40, 684000, NULL, 2, N'Sản xuất tại        Việt Nam
Thể tích        110ml x 4 hộp
Độ tuổi phù hợp        Trên 1 tuổi
Nhà sản xuất        DENEAST VIETNAM COMPANY LIMITED
Số 7 VSIP II-A, đường số 31, khu công nghiệp Việt Nam -Singapore II-A, Xã Vĩnh Tân, Thị xã Tân Uyên, Tỉnh Bình Dương, Việt Nam. Dưới sự giám sát chất lượng của Abbott Laboratories.
Hướng dẫn sử dụng        Khuyên dùng 3-4 hộp mỗi ngày. Không dùng cho trẻ dưới 1 tuổi.
Hướng dẫn bảo quản        . Bảo quản nơi khô mát.
. Lắc đều trước khi uống. Ngon hơn khi uống lạnh.
')
GO
INSERT [dbo].[product] ([product_id], [active], [listed_price], [name], [no_sold], [selling_price], [stock], [fk_brand_id], [description]) VALUES (37, 1, 408000, N'Thùng Sữa uống dinh dưỡng Dielac Grow Plus 110ml (Sữa Non) - Lốc 4 hộp
', 61, 408000, NULL, 8, N'Thể tích        110ml/hộp
Độ tuổi phù hợp        Trẻ em trên 1 tuổi
Nhà sản xuất        Công Ty Cổ Phần Sữa Việt Nam
Hướng dẫn sử dụng        Lắc đều trước khi sử dụng. Sản phẩm cho 1 lần sử dụng.​
Hướng dẫn bảo quản        Bảo quản nơi khô ráo và thoáng mát
Số lốc trong thùng        12 lốc - 48 hộp')
GO
INSERT [dbo].[product] ([product_id], [active], [listed_price], [name], [no_sold], [selling_price], [stock], [fk_brand_id], [description]) VALUES (38, 1, 36000, N'Sữa đêm ngũ cốc Fruto Nyanya (200ml)', 41, 36000, NULL, 15, N'Xuất xứ thương hiệu        Nga
Sản xuất tại        Nga
Dung tích        200ml
Độ tuổi phù hợp        Trẻ từ 6 tháng tuổi
Thành phần        Sữa bột nguyên kem, bột kiều mạch, bột ngô, đường fructose, bột gạo, maltodextrin, prebiotic-inulin, nước')
GO
INSERT [dbo].[product] ([product_id], [active], [listed_price], [name], [no_sold], [selling_price], [stock], [fk_brand_id], [description]) VALUES (39, 1, 36000, N'Sữa đêm yến mạch vị chuối Fruto Nyanya (200ml)', 38, 36000, NULL, 15, N'Xuất xứ thương hiệu        Nga
Sản xuất tại        Nga
Dung tích        200ml
Độ tuổi phù hợp        Trẻ từ 6 tháng tuổi
Thành phần        Sữa bột nguyên kem, chuối nghiền, bột yến mạch, đường fructose, maltodextrin, prebiotic-inulin, nước.')
GO
INSERT [dbo].[product] ([product_id], [active], [listed_price], [name], [no_sold], [selling_price], [stock], [fk_brand_id], [description]) VALUES (40, 1, 36000, N'Sữa đêm gạo sữa Fruto Nyanya (200ml)', 39, 36000, NULL, 15, N'Xuất xứ thương hiệu        Nga
Sản xuất tại        Nga
Dung tích        200ml
Độ tuổi phù hợp        Trẻ từ 6 tháng tuổi
Nhà sản xuất        AO Progess
Thành phần        Sữa bột nguyên kem, chuối nghiền, bột yến mạch, đường fructose, maltodextrin, prebiotic-inulin, nước.')
GO
INSERT [dbo].[product] ([product_id], [active], [listed_price], [name], [no_sold], [selling_price], [stock], [fk_brand_id], [description]) VALUES (41, 1, 249000, N'Thực phẩm dinh dưỡng y học cho trẻ 1-10 tuổi: Pediasure dạng lỏng hương vani 237ml (Lốc 6 chai)
', 18, 249000, NULL, 4, N'Cảnh báo        . Không được hâm nóng bằng lò vi sóng.
. Không dùng cho trẻ bị galactosemia.
. Không dùng qua đường tĩnh mạch.
. Sử dụng cho người bệnh với sự giám sát của nhân viên y tế.
Hướng dẫn sử dụng        . Dùng uống hoặc nuôi ăn qua ống thông;
. Dùng bổ sung chế độ ăn: 2-3 hộp/ ngày hoặc theo hướng dẫn của chuyên viên dinh dưỡng;
. Dùng ngay không cần pha;
. Lắc đều trước khi uống;
. Ngon hơn khi uống lạnh.
Hướng dẫn bảo quản        Bảo quản hộp chưa mở ở nhiệt độ phòng.')
GO
INSERT [dbo].[product] ([product_id], [active], [listed_price], [name], [no_sold], [selling_price], [stock], [fk_brand_id], [description]) VALUES (42, 1, 163000, N'Sữa tươi tiệt trùng A2 Milk (lốc 6 hộp)', 20, 163000, NULL, 16, N'Xuất xứ thương hiệu        New Zealand
Hướng dẫn sử dụng        Uống trực tiếp.
Hướng dẫn bảo quản        . Bảo quản nơi khô và mát, tránh ánh nắng trực tiếp. . Sau khi mở bao bì, bảo quản trong ngăn mát tủ lạnh ở nhiệt độ 1-4oC và sử dụng hết trong vòng 24 giờ.')
GO
INSERT [dbo].[product] ([product_id], [active], [listed_price], [name], [no_sold], [selling_price], [stock], [fk_brand_id], [description]) VALUES (43, 1, 39000, N'Sữa non tươi Vitadairy 180mL (lốc 3 hộp)', 45, 39000, NULL, 10, N'Sản xuất tại        Úc
Trọng lượng sản phẩm        0.6
Hướng dẫn sử dụng        . Lắc đều sản phẩm trước khi uống. Ngon hơn khi dùng lạnh.. Nên dùng 2-3 hộp mỗi ngày.
Hướng dẫn bảo quản        Bảo quản nơi khô ráo, thoáng mát, tránh ánh nắng trực tiếp.')
GO
INSERT [dbo].[product] ([product_id], [active], [listed_price], [name], [no_sold], [selling_price], [stock], [fk_brand_id], [description]) VALUES (44, 1, 480000, N'Thùng Sữa tươi tiệt trùng Oldenburger ít đường 180ml (lốc 4 hộp)', 24, 480000, NULL, 17, N'Thể tích        180ml x 4 hộp
Độ tuổi phù hợp        Từ 1 tuổi trở lên
Nhà sản xuất        Công Ty Cổ Phần Sữa Evergrowth
Cảnh báo        Sản phẩm có chứa sữa, không dùng cho người dị ứng với thành phần sản phẩm
Hướng dẫn sử dụng        Uống trực tiếp, ngon hơn khi uống lạnh
Hướng dẫn bảo quản        Nơi khô thoáng, tránh ánh nắng mặt trời')
GO
INSERT [dbo].[product] ([product_id], [active], [listed_price], [name], [no_sold], [selling_price], [stock], [fk_brand_id], [description]) VALUES (45, 1, 49000, N'Sữa chua hoa quả Hoff - Dâu tây (Lốc 4 hủ)
', 30, 49000, NULL, 18, N'Trọng lượng sản phẩm        55g x 4 hủ
Độ tuổi phù hợp        Bé từ 6 tháng tuổi trở lên
Hướng dẫn bảo quản        Bảo quản từ 4 - 12˚C')
GO
INSERT [dbo].[product] ([product_id], [active], [listed_price], [name], [no_sold], [selling_price], [stock], [fk_brand_id], [description]) VALUES (46, 1, 260000, N'Combo 2 thùng sữa chua uống KUN hương Kem Dâu 110ml - 24 túi', 47, 260000, NULL, 34, N'Thể tích        110ml x 24 túi
Độ tuổi phù hợp        Trẻ từ 2 tuổi trở lên
Cảnh báo        Hiện tượng thay đổi màu sắc và lắng đọng tự nhiên không làm ảnh hưởng đến chất lượng sản phẩm
Hướng dẫn sử dụng        . Ngon hơn khi uống lạnh.
. Lắc đều trước khi sử dụng.
Hướng dẫn bảo quản        . Bảo quản nơi khô ráo và thoáng mát.
. Tránh ánh nắng trực tiếp.')
GO
INSERT [dbo].[product] ([product_id], [active], [listed_price], [name], [no_sold], [selling_price], [stock], [fk_brand_id], [description]) VALUES (47, 1, 119000, N'Sữa chua trái cây Hoff Organic Vị Chuối 6x55g
', 20, 119000, NULL, 18, NULL)
GO
INSERT [dbo].[product] ([product_id], [active], [listed_price], [name], [no_sold], [selling_price], [stock], [fk_brand_id], [description]) VALUES (48, 1, 26000, N'Sữa uống lên men Yakult (lốc 5 hộp 65ml)', 64, 26000, NULL, 19, NULL)
GO
INSERT [dbo].[product] ([product_id], [active], [listed_price], [name], [no_sold], [selling_price], [stock], [fk_brand_id], [description]) VALUES (49, 1, 33000, N'Thức uống lúa mạch uống liền Nestlé Milo 180ml - Lốc 4 hộp', 117, 33000, NULL, 13, N'Cảnh báo        Không sử dụng cho người dị ứng với các thành phần của sản phẩm
Hướng dẫn sử dụng        Sản phẩm cho 1 lần sử dụng, lắc đều trước khi uống
Hướng dẫn bảo quản        Bảo quản sản phẩm nơi khô ráo, thoáng mát, tránh ánh sáng trực tiếp')
GO
INSERT [dbo].[product] ([product_id], [active], [listed_price], [name], [no_sold], [selling_price], [stock], [fk_brand_id], [description]) VALUES (50, 1, 30000, N'Sữa chua Vinamilk Dâu 100g', 75, 30000, NULL, 8, NULL)
GO
INSERT [dbo].[product] ([product_id], [active], [listed_price], [name], [no_sold], [selling_price], [stock], [fk_brand_id], [description]) VALUES (51, 1, 25000, N'Sữa chua Vinamilk ít đường 100g', 74, 25000, NULL, 8, NULL)
GO
INSERT [dbo].[product] ([product_id], [active], [listed_price], [name], [no_sold], [selling_price], [stock], [fk_brand_id], [description]) VALUES (52, 1, 30000, N'Sữa chua Vinamilk Nha đam 100g', 60, 30000, NULL, 8, NULL)
GO
INSERT [dbo].[product] ([product_id], [active], [listed_price], [name], [no_sold], [selling_price], [stock], [fk_brand_id], [description]) VALUES (53, 1, 30000, N'Sữa chua Vinamilk Trái cây 100g', 100, 30000, NULL, 8, NULL)
GO
INSERT [dbo].[product] ([product_id], [active], [listed_price], [name], [no_sold], [selling_price], [stock], [fk_brand_id], [description]) VALUES (54, 1, 21000, N'Thực phẩm bổ sung sữa lúa mạch Nestlé Milo 110ml (Lốc 4 hộp)', 20, 21000, NULL, 13, N'Độ tuổi phù hợp        Phù hợp cho trẻ từ 24 tháng tuổi trở lên
Cảnh báo        Không sử dụng cho người dị ứng với các thành phần của sản phẩm
Hướng dẫn sử dụng        Sản phẩm cho 1 lần sử dụng, lắc đều trước khi uống
Hướng dẫn bảo quản        Bảo quản nơi khô ráo thoáng mát, tránh ánh nắng trực tiếp.')
GO
INSERT [dbo].[product] ([product_id], [active], [listed_price], [name], [no_sold], [selling_price], [stock], [fk_brand_id], [description]) VALUES (55, 1, 32000, N'Sữa tươi tiệt trùng có đường Dutch Lady 180ml - Lốc 4 hộp', 78, 32000, NULL, 20, N'Xuất xứ thương hiệu        Hà Lan
Sản xuất tại        Việt Nam
Trọng lượng sản phẩm        180ml
Nhà sản xuất        FrieslandCampina
Độ tuổi phù hợp        Trẻ từ 1 tuổi
Quy cách đóng gói        4 hộp/ lốc')
GO
INSERT [dbo].[product] ([product_id], [active], [listed_price], [name], [no_sold], [selling_price], [stock], [fk_brand_id], [description]) VALUES (56, 1, 25000, N'Sữa tươi tiệt trùng TH true Milk ít đường 110ml (lốc 4 hộp)', 80, 25000, NULL, 21, NULL)
GO
INSERT [dbo].[product] ([product_id], [active], [listed_price], [name], [no_sold], [selling_price], [stock], [fk_brand_id], [description]) VALUES (57, 1, 39000, N'Sữa tươi tiệt trùng nguyên chất TH true Milk 180ml (lốc 4 hộp)', 65, 39000, NULL, 21, NULL)
GO
INSERT [dbo].[product] ([product_id], [active], [listed_price], [name], [no_sold], [selling_price], [stock], [fk_brand_id], [description]) VALUES (59, 1, 54000, N'Sữa đậu đen, óc chó hạnh nhân 190ml (Lốc 3)', 54, 54000, NULL, 22, N'Xuất xứ thương hiệu        Hàn Quốc
Sản xuất tại        Hàn Quốc
Dung tích        190ml
')
GO
INSERT [dbo].[product] ([product_id], [active], [listed_price], [name], [no_sold], [selling_price], [stock], [fk_brand_id], [description]) VALUES (60, 1, 108000, N'Sữa đêm gạo vị mâm xôi Fruto Nyanya (lốc 3 hộp)', 19, 108000, NULL, 15, NULL)
GO
INSERT [dbo].[product] ([product_id], [active], [listed_price], [name], [no_sold], [selling_price], [stock], [fk_brand_id], [description]) VALUES (61, 1, 85000, N'Sữa hạt hạnh nhân nguyên chất hiệu 137oC Degrees (137oC Degrees Almond Milk Original)', 20, 85000, NULL, 23, NULL)
GO
INSERT [dbo].[product] ([product_id], [active], [listed_price], [name], [no_sold], [selling_price], [stock], [fk_brand_id], [description]) VALUES (62, 1, 95000, N'Sữa hạt óc chó nguyên chất hiệu 137oC Degrees (137oC Degrees Walnut Milk Original)', 16, 95000, NULL, 23, NULL)
GO
INSERT [dbo].[product] ([product_id], [active], [listed_price], [name], [no_sold], [selling_price], [stock], [fk_brand_id], [description]) VALUES (63, 1, 39000, N'Nước nhung hươu Vitamin Ki & Young 12M+', 25, 39000, NULL, 24, N'Xuất xứ thương hiệu        Hàn Quốc
Thể tích        80ml
Độ tuổi phù hợp         Từ 12 tháng tuổi trở lên
Nhà sản xuất        Mom&Young Bio Agricultural Coporation
')
GO
INSERT [dbo].[product] ([product_id], [active], [listed_price], [name], [no_sold], [selling_price], [stock], [fk_brand_id], [description]) VALUES (64, 1, 110880, N'Nước yến sào cao cấp Nunest Kids vị dâu 70ml (Lốc 3+1)', 46, 110880, NULL, 25, NULL)
GO
INSERT [dbo].[product] ([product_id], [active], [listed_price], [name], [no_sold], [selling_price], [stock], [fk_brand_id], [description]) VALUES (66, 1, 24000, N'Sữa tươi tiệt trùng Dalat Milk ít đường 110ml (lốc 4 hộp)', 55, 24000, NULL, 26, NULL)
GO
INSERT [dbo].[product] ([product_id], [active], [listed_price], [name], [no_sold], [selling_price], [stock], [fk_brand_id], [description]) VALUES (67, 1, 29000, N'Sữa Đêm Ngũ Cốc Vị Lê Và Chuối Agusha 200ml', 40, 29000, NULL, 27, N'Xuất xứ thương hiệu        Nga
Thể tích        200ml
Độ tuổi phù hợp         Từ 6 tháng tuổi trở lên
Nhà sản xuất        Công ty Cổ phần VBD
Hướng dẫn sử dụng        Khi cho trẻ dưới 1 tuổi ăn, đổ sữa vào một chiếc đĩa sạch và đun trong nồi cách thủy đến nhiệt độ từ +36°C đến +38°C.
Hướng dẫn bảo quản        . Bảo quản ở nhiệt độ từ + 2°C đến + 25°C.
. Sản phẩm trong bao bì đã mở không được bảo quản.
')
GO
INSERT [dbo].[product] ([product_id], [active], [listed_price], [name], [no_sold], [selling_price], [stock], [fk_brand_id], [description]) VALUES (68, 1, 29000, N'Sữa Ngày Ngũ Cốc Vị Đào Agusha 200ml', 46, 29000, NULL, 27, N'Xuất xứ thương hiệu        Nga
Thể tích        200ml
Độ tuổi phù hợp         Từ 6 tháng tuổi trở lên
Nhà sản xuất        Công ty Cổ phần VBD
Hướng dẫn sử dụng        Khi cho trẻ dưới 1 tuổi ăn, đổ sữa vào một chiếc đĩa sạch và đun trong nồi cách thủy đến nhiệt độ từ +36°C đến +38°C.
Hướng dẫn bảo quản        . Bảo quản ở nhiệt độ từ + 2°C đến + 25°C.
. Sản phẩm trong bao bì đã mở không được bảo quản.
')
GO
INSERT [dbo].[product] ([product_id], [active], [listed_price], [name], [no_sold], [selling_price], [stock], [fk_brand_id], [description]) VALUES (69, 1, 69000, N'Nước gạo Hàn Quốc Morning Rice 1500 ml', 32, 69000, NULL, 28, NULL)
GO
INSERT [dbo].[product] ([product_id], [active], [listed_price], [name], [no_sold], [selling_price], [stock], [fk_brand_id], [description]) VALUES (70, 1, 445000, N'Bỉm tã quần Moony Natural size M 46 miếng (5-10kg) (giao bao bì ngẫu nhiên)', 85, 445000, NULL, 29, N'Sản xuất tại        Nhật Bản
Kích cỡ (size)        M, 5-10 kg
Số miếng        46
Chất liệu        Vải không dệt, bông cellulose, hạt siêu thấm, PE, PP, chun, dải chun, polyme kết dính
Hướng dẫn bảo quản        Bảo quản nơi khô ráo, thoáng mát, tránh ánh nắng trực tiếp, để xa tầm tay trẻ em')
GO
INSERT [dbo].[product] ([product_id], [active], [listed_price], [name], [no_sold], [selling_price], [stock], [fk_brand_id], [description]) VALUES (71, 1, 1035000, N'Combo 3 gói Bỉm tã quần Whito size M 58 miếng (7-10kg)', 77, 1035000, NULL, 30, N'Xuất xứ thương hiệu        Nhật Bản
Sản xuất tại        Nhật Bản
Số miếng        58
Chất liệu        Màng vải không dệt, màng đáy chống thấm, bột giấy, hạt thấm hút, giấy, thun đàn hồi, keo cấu trúc, băng dán.
Hướng dẫn bảo quản        . Bảo quản nơi thoáng mát, tránh ánh nắng trực tiếp, để xa tầm tay trẻ em và nguồn nhiệt..
. Khi mở sản phẩm cần bảo quản cẩn thận để tránh bụi và côn trùng.
Chú ý: Vạch báo thay tã thông minh có thể thay đổi màu sắc trước khi sử dụng nếu để tã trong môi trường nóng hoặc ẩm. Tuy nhiên, điều này không ảnh hưởng đến chất lượng tã.')
GO
INSERT [dbo].[product] ([product_id], [active], [listed_price], [name], [no_sold], [selling_price], [stock], [fk_brand_id], [description]) VALUES (72, 1, 710000, N'Combo 2 gói Bỉm tã quần Pampers Nhật size M 48 miếng (6-11kg', 69, 710000, NULL, 31, N'Xuất xứ thương hiệu        Nhật Bản
Sản xuất tại        Nhật Bản
Kích cỡ (size)        M, 6-11kg
Số miếng        48
Chất liệu        Keo dính, hạt thấm hút Polymer, bột giấy, màng polyolefin, polyester, sữa dưỡng da, dây cao su tổng hợp.
Hướng dẫn bảo quản        . Bảo quản nơi khô ráo, thoáng mát, tránh ánh nắng trực tiếp. Sau khi mở bao bì, để sản phẩm ở nơi sạch sẽ.')
GO
INSERT [dbo].[product] ([product_id], [active], [listed_price], [name], [no_sold], [selling_price], [stock], [fk_brand_id], [description]) VALUES (74, 1, 758000, N'Combo 2 gói Bỉm tã quần Moony bé trai size L 44 miếng (9-14kg)', 70, 758000, NULL, 32, N'Xuất xứ thương hiệu        Nhật Bản
Sản xuất tại        Nhật Bản
Kích cỡ (size)        L - bé trai, 9-14kg
Số miếng        44
Chất liệu        Màng thấm: Vải không dệt (Polyolefin, Polyester)
Lõi thấm: Bột giấy, Hạt siêu thấm
Màng đáy: Polyolefin
Tai dính: Polyolefin, Chun sợi, Polyurethane, Polyme kết dính
Tinh chất dầu Olive
Hướng dẫn bảo quản        Bảo quản nơi khô ráo, thoáng mát, tránh ánh nắng mặt trời')
GO
INSERT [dbo].[product] ([product_id], [active], [listed_price], [name], [no_sold], [selling_price], [stock], [fk_brand_id], [description]) VALUES (75, 1, 830000, N'Combo 2 Tã quần Pampers giữ dáng Super Jumbo size L', 14, 830000, NULL, 31, N'Xuất xứ thương hiệu        Nhật Bản
Kích cỡ (size)        L, 9-14kg
Số miếng        68
Chất liệu        Bột giấy, keo dính, hạt thấm hút Polymer, màng polyolefin, polyester, sữa dưỡng da, dây cao su tổng hợp.
Hướng dẫn bảo quản        . Bảo quản nơi khô ráo, thoáng mát, tránh ánh nắng trực tiếp. Sau khi mở bao bì, để sản phẩm ở nơi sạch sẽ, tránh bụi bẩn và côn trùng xâm nhập vào bên trong.')
GO
INSERT [dbo].[product] ([product_id], [active], [listed_price], [name], [no_sold], [selling_price], [stock], [fk_brand_id], [description]) VALUES (76, 1, 375000, N'Bỉm tã quần Bobby size L 68 miếng (9-13kg) (giao bao bì ngẫu nhiên)', 90, 375000, NULL, 33, N'Xuất xứ thương hiệu        Nhật Bản
Sản xuất tại        Việt Nam
Kích cỡ (size)        L, 9-13kg
Số miếng        68
Chất liệu        Vải không dệt, Hạt siêu thấm, Bông Cellulose, PE, PP, Chun, Polyme kết dính, Trà xanh Matcha
Hướng dẫn bảo quản        Bảo quản nơi khô mát, tránh bụi và ánh nắng trực tiếp')
GO
INSERT [dbo].[product] ([product_id], [active], [listed_price], [name], [no_sold], [selling_price], [stock], [fk_brand_id], [description]) VALUES (77, 1, 445000, N'Bỉm tã quần Moony Natural size XL 32 miếng (12-22kg) (giao bao bì ngẫu nhiên)', 43, 445000, NULL, 29, NULL)
GO
INSERT [dbo].[product] ([product_id], [active], [listed_price], [name], [no_sold], [selling_price], [stock], [fk_brand_id], [description]) VALUES (78, 1, 478000, N'Combo 2 bỉm tã dán Huggies Platinum Nature Made size Newborn 60 miếng (dưới 5kg)', 120, 478000, NULL, 35, NULL)
GO
INSERT [dbo].[product] ([product_id], [active], [listed_price], [name], [no_sold], [selling_price], [stock], [fk_brand_id], [description]) VALUES (79, 1, 195000, N'Tã dán Bobby siêu thấm - khô thoáng (Sơ sinh, dưới 5kg, 70 miếng)
', 155, 195000, NULL, 33, NULL)
GO
INSERT [dbo].[product] ([product_id], [active], [listed_price], [name], [no_sold], [selling_price], [stock], [fk_brand_id], [description]) VALUES (80, 1, 299000, N'Bỉm tã dán Bobby siêu thấm size L', 59, 299000, NULL, 33, NULL)
GO
INSERT [dbo].[product] ([product_id], [active], [listed_price], [name], [no_sold], [selling_price], [stock], [fk_brand_id], [description]) VALUES (81, 1, 89000, N'Miếng lót Huggies size Newborn 1 56 miếng (dưới 5kg)', 53, 89000, NULL, 35, NULL)
GO
INSERT [dbo].[product] ([product_id], [active], [listed_price], [name], [no_sold], [selling_price], [stock], [fk_brand_id], [description]) VALUES (82, 1, 119000, N'Bánh gạo hữu cơ Gerber Organic vị xoài chuối cà rốt', 85, 119000, NULL, 36, N'Xuất xứ thương hiệu	Thái Lan
Trọng lượng sản phẩm	48g
Độ tuổi phù hợp	Dùng cho trẻ từ 7 tháng tuổi')
GO
INSERT [dbo].[product] ([product_id], [active], [listed_price], [name], [no_sold], [selling_price], [stock], [fk_brand_id], [description]) VALUES (83, 1, 98000, N'Combo 2 Bánh Gặm Nướu Ngũ Cốc Grinny Vị Dâu Tây', 40, 98000, NULL, 37, N'Xuất xứ thương hiệu	Thái Lan
Trọng lượng sản phẩm	40g
Độ tuổi phù hợp	Dùng cho trẻ từ 09 tháng tuổi trở lên.
')
GO
INSERT [dbo].[product] ([product_id], [active], [listed_price], [name], [no_sold], [selling_price], [stock], [fk_brand_id], [description]) VALUES (84, 1, 86000, N'Bánh gạo Gerber vị Dâu Táo Cải bó xôi', 72, 86000, NULL, 36, N'Xuất xứ thương hiệu	Thái Lan
Trọng lượng sản phẩm	48g
Độ tuổi phù hợp	Dùng cho trẻ từ 7 tháng tuổi
')
GO
INSERT [dbo].[product] ([product_id], [active], [listed_price], [name], [no_sold], [selling_price], [stock], [fk_brand_id], [description]) VALUES (85, 1, 69000, N'Bột ăn dặm Ridielac Gold 4 Vị Mặn HG 200g', 76, 69000, NULL, 8, NULL)
GO
INSERT [dbo].[product] ([product_id], [active], [listed_price], [name], [no_sold], [selling_price], [stock], [fk_brand_id], [description]) VALUES (86, 1, 64000, N'Combo 2 Mỳ Ý thịt thăn xốt cà chua SG Food 200g', 14, 64000, NULL, 38, N'Xuất xứ thương hiệu	Việt Nam
Trọng lượng sản phẩm	200g
Độ tuổi phù hợp	Phù hợp cho trẻ từ 1 tuổi trở lên và người lớn
Nhà sản xuất	CÔNG TY CỔ PHẦN SÀI GÒN FOOD
Thành phần	Nước, mỳ Ý: 24,2%, thịt thăn heo: 7,5%, cà chua cô đặc: 5%, dầu thực vật, hành tây, sữa tươi, đường tinh luyện, bơ lạt, tỏi, kem sữa tươi, hạt nêm, muối I-ốt, chất ổn định (INS 415), chiết xuất ớt. 
')
GO
INSERT [dbo].[product] ([product_id], [active], [listed_price], [name], [no_sold], [selling_price], [stock], [fk_brand_id], [description]) VALUES (87, 1, 28000, N'Cháo tươi Baby gà cà rốt', 48, 28000, NULL, 38, NULL)
GO
INSERT [dbo].[product] ([product_id], [active], [listed_price], [name], [no_sold], [selling_price], [stock], [fk_brand_id], [description]) VALUES (88, 1, 29000, N'Cháo tươi hải sản thập cẩm Cây Thị', 65, 29000, NULL, 39, N'Xuất xứ thương hiệu	Việt Nam
Trọng lượng sản phẩm	240g
Thành phần	Nước xương hầm, Gạo tấm (10%), Thịt tôm (4%), Mực (4%), Cà rốt (2%), Đậu Hà Lan (1%), Thực phẩm bổ sung dầu ăn dinh dưỡng cho trẻ em Kiddy, Hành tím, Muối tinh, Đường tinh luyện, Calcium carbonate, Vitamin B1 (Thiaminchloride hydrochioride), Vitamin B6 (Pyridoxine hydrochloride).
')
GO
INSERT [dbo].[product] ([product_id], [active], [listed_price], [name], [no_sold], [selling_price], [stock], [fk_brand_id], [description]) VALUES (89, 1, 25000, N'Cháo tươi thịt bò cà rốt', 41, 25000, NULL, 39, N'Xuất xứ thương hiệu	Việt Nam
Trọng lượng sản phẩm	240g
Thành phần	Nước xương hầm, Gạo tấm (10%), Thịt bò (7%), Cà rốt (2%), Thực phẩm bổ sung dầu ăn dinh dưỡng cho trẻ em nhãn hiệu Kiddy, Gừng, Tỏi, Muối tinh, Đường tinh luyện, Calcium carbonate, Vitamin B1 (Thiaminchloride hydrochloride), Vitamin B6 (Pyridoxine hydrochloride). 
')
GO
INSERT [dbo].[product] ([product_id], [active], [listed_price], [name], [no_sold], [selling_price], [stock], [fk_brand_id], [description]) VALUES (91, 1, 45000, N'Thuyền Xưa Ăn Dặm Cho Con - Gia vị rắc cơm - Vị Rong biển 19gr', 68, 45000, NULL, 40, N'Thương hiệu	Thuyền Xưa
Xuất xứ thương hiệu	Nhật Bản
Trọng lượng sản phẩm	19gr/túi
Độ tuổi phù hợp	Trẻ từ 12 tháng tuổi
')
GO
INSERT [dbo].[product] ([product_id], [active], [listed_price], [name], [no_sold], [selling_price], [stock], [fk_brand_id], [description]) VALUES (92, 1, 125000, N'Dầu Olive Nguyên Chất Thuyền Xưa Ăn Dặm Cho Con 250ml', 15, 125000, NULL, 40, N'Xuất xứ thương hiệu	Ý
Thể tích	250ml
Độ tuổi phù hợp	Sử dụng cho bé từ 6 tháng tuổi
Nhà sản xuất	OLEIFICI SITA'' S.R.LVia Roma SNC 89040 - Agnana Calabra (RC)- Italy
Thành phần	100% Dầu Olive nguyên chất.
')
GO
INSERT [dbo].[product] ([product_id], [active], [listed_price], [name], [no_sold], [selling_price], [stock], [fk_brand_id], [description]) VALUES (93, 1, 25000, N'Kẹo dẻo Haribo Goldbears 80g', 34, 25000, NULL, 41, NULL)
GO
INSERT [dbo].[product] ([product_id], [active], [listed_price], [name], [no_sold], [selling_price], [stock], [fk_brand_id], [description]) VALUES (94, 1, 44000, N'Combo 2 Bánh que Pocky hương vị sô cô la', 86, 44000, NULL, 42, N'Xuất xứ thương hiệu	Nhật Bản
Sản xuất tại	Thái Lan
Độ tuổi phù hợp	Bé từ 3 tuổi trở lên
')
GO
INSERT [dbo].[product] ([product_id], [active], [listed_price], [name], [no_sold], [selling_price], [stock], [fk_brand_id], [description]) VALUES (95, 1, 44000, N'Combo 2 Bánh que Pocky vị dâu', 80, 44000, NULL, 42, N'Xuất xứ thương hiệu	Nhật Bản
Sản xuất tại	Thái Lan
Độ tuổi phù hợp	Bé từ 3 tuổi trở lên
')
GO
INSERT [dbo].[product] ([product_id], [active], [listed_price], [name], [no_sold], [selling_price], [stock], [fk_brand_id], [description]) VALUES (96, 1, 22000, N'Bánh gấu Koala''s March nhân sô cô la', 47, 22000, NULL, 43, NULL)
GO
INSERT [dbo].[product] ([product_id], [active], [listed_price], [name], [no_sold], [selling_price], [stock], [fk_brand_id], [description]) VALUES (97, 1, 55000, N'Váng sữa uống Zott Monte hương Vani 4x95ml', 120, 55000, NULL, 44, NULL)
GO
INSERT [dbo].[product] ([product_id], [active], [listed_price], [name], [no_sold], [selling_price], [stock], [fk_brand_id], [description]) VALUES (98, 1, 66000, N'Váng sữa Zott Monte hương Vani 4x55g', 72, 66000, NULL, 44, NULL)
GO
INSERT [dbo].[product] ([product_id], [active], [listed_price], [name], [no_sold], [selling_price], [stock], [fk_brand_id], [description]) VALUES (100, 1, 499000, N'Máy hâm sữa 2 bình Gluck GN05 Xanh da trời', 30, 349000, NULL, 45, N'Chức năng:
- Giữ ấm sữa ở 40°C (Gần với nhiệt độ sữa mẹ)
- Hâm nóng sữa đông lạnh/thức ăn ở 70°C
- Tiệt trùng ở 100°C

HƯỚNG DẪN SỬ DỤNG
- Nút OFF : chế độ máy không hoạt động
- Mức 40°C : giữ ấm sữa  áp dụng đối với bình sữa vừa mới pha xong hoặc là sữa bé vừa sử dụng (nhiệt độ bình thường). Máy sẽ giữ ấm liên tục đến 40 độ C ( lưu ý chức năng này không làm nóng sữa từ trong tủ lạnh ra ).
- Mức  70°C : làm nóng sữa hoặc thức ăn sau khi lấy từ ngăn mát (nhiệt độ trung bình từ 5- 10 độ C). Hâm sữa trong vòng 6 phút nhiệt độ sữa sẽ tăng từ từ để đảm bảo không làm ảnh hưởng đến chất lượng sữa .
- Mức 100°c : tiệt trùng 1 bình sữa, núm ti, ti ngậm…

HƯỚNG DẪN BẢO QUẢN 
Bảo quản nơi khô ráo , tránh môi trường ẩm ướt .Tránh các vật liệu máy móc gây cháy nổ

Cảnh bảo
- Trong khi sử dụng , vui lòng để sản phẩm khỏi tầm tay của trẻ em.
- Xin vui lòng không vặn núm điều khiển khi chưa có nước không khay hâm nóng.
- Vui lòng ngắt điện sau khi sử dụng
- Vui lòng cho nước vào khay trước khi cắm điện, không nên để máy khô nước
- Khay hâm nóng phải luôn khô ráo sau khi sử dụng

Lưu ý :
- Lưu ý rằng thức ăn trong máy hâm nóng quá lâu rất dễ bị hư.
- Vui lòng không ngâm máy hâm nóng vào trong nước.
- Sau khi thức ăn được hâm nóng, hãy thử độ nóng trước khi cho bé ăn, tránh gây bỏng cho bé.
- Thức ăn không nên được hâm quá lâu
- Nhiệt độ nóng tốt nhất của thức ăn cho bé của bạn ở mức 37 độ C . Trước khi cho bé ăn nên thử thức ăn trên cổ tay của bạn, không nên cho bé ăn thức ăn quá nóng hoặc quá lạnh.

')
GO
INSERT [dbo].[product] ([product_id], [active], [listed_price], [name], [no_sold], [selling_price], [stock], [fk_brand_id], [description]) VALUES (101, 1, 345000, N'Bình sữa Edison PPSU 240ml (xanh)', 55, 345000, NULL, 46, N'- Thông số kỹ thuật: Dung tích: 240 ml; Độ tuổi sử dụng: từ 0 tháng tuổi. 

- Hướng dẫn sử dụng: Dùng cho bé bú. Sử dụng sản phẩm dưới sự giám sát của người lớn.

- Hướng dẫn bảo quản: Làm sạch sản phẩm bằng bàn chải mềm và chất tẩy rửa cho trẻ sơ sinh (Không chà rửa quá mạnh). Nên khử trùng sản phẩm bằng nước nóng, thay vì khử trùng trong chai UV, máy rửa chén, lò vi sóng.﻿﻿

')
GO
INSERT [dbo].[product] ([product_id], [active], [listed_price], [name], [no_sold], [selling_price], [stock], [fk_brand_id], [description]) VALUES (102, 1, 825000, N'Bộ hai bình sữa silicone Comotomo 250ml - Xanh', 59, 825000, NULL, 47, N'Comotomo - thương hiệu dẫn đầu thị trường về việc sử dụng chất liệu silicone trong sản xuất

bình sữa, cho con cảm giác mềm mại, gần gũi như bầu ngực mẹ, siêu dễ dàng để bé chuyển đổi từ bú mẹ sang bú bình hoặc ngược lại. Sản phẩm cực HOT từ Mỹ được yêu thích trên toàn cầu.

')
GO
INSERT [dbo].[product] ([product_id], [active], [listed_price], [name], [no_sold], [selling_price], [stock], [fk_brand_id], [description]) VALUES (103, 1, 315000, N'Bình sữa Edison PPSU 160ml (Hồng)
', 18, 315000, NULL, 46, N'Ưu điểm nổi bật của sản phẩm 

Bình sữa có núm vú silicone siêu mềm, giúp bé dễ làm quen và chuyển đổi từ bú mẹ sang bú bình một cách dễ dàng 

Tích hợp van thông khí trên núm ty, giúp giảm nôn trớ, đau bụng

Làm từ nhựa PPSU cao cấp, an toàn cho bé



Hướng dẫn sử dụng 

Tiệt trùng trước khi sử dụng lần đầu tiên và sau mỗi lần sử dụng. 

Nếu bé tự cầm bình cần có sự giám sát của người lớn

Nên thay mới núm ty sau 3 tháng sử dụng hoặc thấy xuất hiện vết nứt, rách



Hướng dẫn bảo quản 

Làm sạch sản phẩm bằng bàn chải mềm và chất tẩy rửa cho trẻ sơ sinh (Không chà rửa quá mạnh) 

Nên khử trùng sản phẩm bằng nước nóng

Không khử trùng trong tia UV, máy rửa chén, lò vi sóng

')
GO
INSERT [dbo].[product] ([product_id], [active], [listed_price], [name], [no_sold], [selling_price], [stock], [fk_brand_id], [description]) VALUES (104, 1, 145000, N'Chăn lưới cho bé Animo B2201_BR001 (70x90cm', 3, 145000, NULL, 48, N'Chăn lưới cho bé Animo B2201_BR001 (70x90cm,Hồng) với chất liệu 100% cotton mềm mại, ấm áp. Chăn lưới tiện lợi xếp gọn khi đi xa. Dùng để đắp giữ ấm cho trẻ trong thời tiết mùa đông, dùng đắp ở nhà hay bán trú tại trường đều rất thích hợp.')
GO
INSERT [dbo].[product] ([product_id], [active], [listed_price], [name], [no_sold], [selling_price], [stock], [fk_brand_id], [description]) VALUES (105, 1, 2190000, N'Nôi tự động Autoru ECO 25 - Xanh Nhạt', 25, 1752000, NULL, 49, N'Ưu điểm nổi bật
. Ống thép khung nôi có đường kính lớn, tạo sự chắc chắn và an toàn.
. Khung lắp ráp, gọn gàng, tiện dụng
. Độ rộng tiếp đất lớn (64cm) giúp nôi đưa rất vững
. Chân đế cao su tăng ma sát, chống trượt khi đưa nôi.
. Sức đưa lên đến 25kg
. Nôi hai tầng thoáng & tiện nghi, tầng 2 có thể hạ chân, gấp gọn và tháo rời.
. Hai móc lòng nôi cấu tạo 2 vòng bi, giúp giảm ma sát tối đa, tăng sức mạnh và độ êm dịu cho nhịp đưa.
. Đạt chứng nhận Hợp quy sản phẩm vải - dệt may
. Dùng điện hoặc bằng tay để đưa nôi, giúp bé ngủ ngon
Kết cấu dạng khung gập, có thể thu gọn, dể di chuyển hay cất giữ
. Có khóa lòng nôi để bé đứng chơi
. Khung treo mùng cao và thoáng và có mùng chống muỗi đi kèm
. Kết cấu dạng khung gập, có thể thu gọn, dể di chuyển hay cất giữ')
GO
INSERT [dbo].[product] ([product_id], [active], [listed_price], [name], [no_sold], [selling_price], [stock], [fk_brand_id], [description]) VALUES (106, 1, 1490000, N'Máy hút sữa rảnh tay & không dây Animo', 15, 1490000, NULL, 48, N'Ưu điểm nổi bật 

. Thiết kế nhỏ gọn không dây, tiện lợi:  mẹ có thể thoải mái vừa ngồi làm việc vừa hút sữa hoặc vừa chăm bé vừa hút sữa;

. Hoạt động êm ái với 2 chế độ hoạt động: chế độ hút (9 cấp độ) và chế độ massage (9 cấp độ);

. Màn hình: LCD, hiển thị thời gian và chế độ hút, giúp mẹ dễ dàng theo dõi được thời gian và chế độ đang hút để điều chỉnh cho phù hợp; 

. Sử dụng pin sạc, dây sạc USB và tặng kèm 1 van silicone thay thế.')
GO
INSERT [dbo].[product] ([product_id], [active], [listed_price], [name], [no_sold], [selling_price], [stock], [fk_brand_id], [description]) VALUES (107, 1, 1089000, N'Máy hút sữa điện đơn Gluck GP31', 49, 762000, NULL, 45, N'Máy hút sữa điện đơn Gluck GP31 của thương hiệu Gluck (Đức) là sản phẩm uy tín và chất lượng theo chuẩn châu Âu. Với công nghệ hút sữa hai giai đoạn, hút đồng thời hai bên, bầu ngực của mẹ sẽ được massage giúp tăng cường việc tiết sữa.
ĐẶC ĐIỂM NỔI BẬT
Công nghệ hút sữa 2 giai đoạn
Áp lực hút 390mmHg/420mmHg
Tiếng ồn <60db
Công suất 5W
Nguồn điện 220V
')
GO
INSERT [dbo].[product] ([product_id], [active], [listed_price], [name], [no_sold], [selling_price], [stock], [fk_brand_id], [description]) VALUES (108, 1, 175000, N'Túi trữ sữa Gluck Baby 3D Double Zip 250ml (50 túi)', 80, 175000, NULL, 45, N'Túi trữ sữa Gluck Baby 3D Double Zip là sản phẩm an toàn và thông minh hỗ trợ mẹ tối đa trong quá trình chăm sóc bé yêu. Được làm từ chất liệu PE cao cấp và diệt khuẩn bằng tia Gamma, sản phẩm đáp ứng được các tiêu chuẩn nghiêm ngặt của Châu Âu
Ưu điểm nổi bật 

. An toàn tuyệt đối

- Sản phẩm được làm từ chất liệu PE cao cấp, hoàn toàn không có chứa BPA, đảm bảo an toàn tuyệt đối khi tiếp xúc với thực phẩm.

- Đã được kiểm định nghiêm ngặt theo tiêu chuẩn của châu Âu

- Được diệt khuẩn bằng tia Gamma trong sản xuất

- Được niêm phong bằng seal ở phần miệng túi, vì thế có thể sử dụng ngay khi mở túi mà không cần phải tiệt trùng

. Thiết kế thông minh

- Thiết kế dạng đứng, miệng túi rộng, cứng cáp giúp cho sữa vào một cách dễ dàng.

- 2 khóa zip lock được làm bằng nhựa cường lực, cho tác dụng chống tràn, chống rò rỉ sữa hiệu quả.

- Nẹp chống rò rỉ giúp sữa được tách biệt với bên ngoài.

- Thiết kế dễ sắp đặt khi bảo quản không cần phụ thuộc thời gian đóng băng 48 giờ, giúp lưu trữ đông lạnh an toàn trong vòng 3 tháng.

 

Hướng dẫn sử dụng

B1: Xé mép bảo vệ của túi rồi tách khóa zipper ra.

B2: Mở rộng đáy túi, giữ túi thẳng đứng rồi sau đó đổ sữa đã hút vào.

B3: Dùng lực của tay để ép dẹp túi cho không khí thừa ra hết và vuốt nhẹ để khóa zipper lại.

B4: Ghi chú lại ngày tháng trữ sữa để đảm bảo sử dụng đúng trong thời hạn cho phép.

B5: Đặt túi trữ sữa vào ngăn đông tủ lạnh để bảo quản

B6: Khi sử dụng cho con, các mẹ ngâm trong nước ấm để rã đông. Tuyệt đối không dùng nước sôi hay lò vi sóng để rã đông sữa.

B7: Đổ sữa vào bình rồi lắc đều và cho bé bú.')
GO
INSERT [dbo].[product] ([product_id], [active], [listed_price], [name], [no_sold], [selling_price], [stock], [fk_brand_id], [description]) VALUES (109, 1, 109000, N'Sữa rửa mặt Tạo Bọt Senka Perfect Whip 120g', 21, 109000, NULL, 50, N'Hướng dẫn sử dụng:
. Làm ướt tay. Lấy một lượng vừa đủ (khoảng 2 - 3 cm) ra lòng bàn tay. Tạo thật nhiều bọt với một ít nước. Mát-xa da mặt với bọt theo chuyển động tròn. Rửa lại thật sạch với nước.
Lưu ý:
• Tránh tiếp xúc với mắt. Nếu có, rửa ngay bằng nước lạnh hoặc nước ấm
• Bảo quản tránh ánh sáng trực tiếp, nơi có nhiệt độ cao hoặc ẩm ướt. Để xa tầm tay trẻ em
• Không sử dụng cho vùng da bị tổn thương
• Ngưng dùng ngay khi có biểu hiện kích ứng và tham khảo ý kiến bác sĩ da liễu.
')
GO
INSERT [dbo].[product] ([product_id], [active], [listed_price], [name], [no_sold], [selling_price], [stock], [fk_brand_id], [description]) VALUES (110, 1, 99000, N'Dung dịch vệ sinh phụ nữ Lactacyd Odor Fresh ngăn mùi 250ml', 75, 99000, NULL, 51, N'Dung dịch vệ sinh phụ nữ Lactacyd Odor Fresh 250ml chứa thành phần tự nhiên, có tác dụng làm sạch vùng kín nhẹ nhàng. Đồng thời có khả năng ức chế sự phát triển của vi khuẩn gây bệnh phụ khoa. Sản phẩm có mùi thơm dịu, giúp ngăn mùi suốt 24 giờ.')
GO
INSERT [dbo].[product] ([product_id], [active], [listed_price], [name], [no_sold], [selling_price], [stock], [fk_brand_id], [description]) VALUES (111, 1, 175000, N'Combo 5 Khăn Ướt Dịu Nhẹ Animo không mùi (100 tờ)', 32, 175000, NULL, 48, N'Số miếng	100 tờ
Khăn ướt Animo là sản phẩm khăn ướt thích hợp sử dụng cho mọi lứa tuổi, kể cả các bé sơ sinh. Sản phẩm có nắp đậy giúp giữ ẩm và bảo quản khăn, tránh nhiễm khuẩn ngược.
Hướng dẫn sử dụng 

. Mở nắp, bóc bỏ miếng decal phía trong, rút từng chiếc khăn sử dụng. 

. Sau khi sử dụng xong đóng nắp lại để giữ ẩm và chống nhiễm khuẩn

')
GO
INSERT [dbo].[product] ([product_id], [active], [listed_price], [name], [no_sold], [selling_price], [stock], [fk_brand_id], [description]) VALUES (112, 1, 88000, N'Combo 2 Khăn ướt Huggies 80 miếng', 135, 88000, NULL, 35, N'Đặc điểm nổi bật

Công nghệ Mess-lock 6 lớp độc quyền từ Huggies: Khăn giấy ướt em bé Huggies nhờ công nghệ Mess-lock 6 lớp với sợi giấy tự nhiên siêu thấm giúp hút sạch, khoá chặt và loại bỏ đến 99% vi khuẩn. Sản phẩm dễ dàng lau sạch trong 1 lần những vết bẩn từ mặt, tay và mông của bé.

Lớp khăn dày, mềm mịn dịu nhẹ cho da bé: Khăn giấy ướt em bé Huggies được làm từ sợi giấy tự nhiên siêu thấm với hàm lượng bột giấy cao mang đến lớp khăn dày và mềm mịn giúp nâng niu bảo vệ tốt nhất cho làn da bé

Không mùi, không cồn, không Paraben & MIT: Khăn giấy ướt em bé Huggies được chứng nhận Y khoa, an toàn tuyệt đối để mẹ có thể yên tâm làn da mỏng manh của bé đã được bảo vệ chu toàn

')
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
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (7, 1)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (8, 1)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (8, 9)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (8, 14)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (9, 1)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (9, 9)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (9, 14)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (10, 1)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (10, 9)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (10, 15)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (10, 16)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (11, 1)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (11, 9)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (11, 17)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (12, 1)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (12, 10)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (12, 14)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (13, 1)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (13, 10)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (13, 14)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (14, 1)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (14, 10)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (14, 15)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (15, 1)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (15, 10)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (15, 17)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (16, 1)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (16, 10)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (16, 17)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (17, 1)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (17, 11)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (17, 16)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (18, 1)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (18, 12)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (18, 16)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (19, 1)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (19, 11)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (19, 16)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (20, 1)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (20, 11)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (20, 16)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (21, 1)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (21, 11)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (21, 18)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (22, 1)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (22, 11)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (22, 14)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (23, 1)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (23, 13)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (23, 14)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (24, 1)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (24, 13)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (24, 14)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (25, 1)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (25, 13)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (25, 15)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (26, 1)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (26, 13)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (26, 16)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (27, 1)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (27, 13)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (27, 16)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (28, 1)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (28, 13)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (28, 15)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (28, 16)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (29, 1)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (29, 13)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (29, 15)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (29, 16)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (30, 1)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (30, 13)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (30, 17)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (31, 1)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (31, 13)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (31, 17)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (32, 2)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (32, 19)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (33, 2)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (33, 19)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (34, 2)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (34, 19)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (35, 2)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (35, 19)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (36, 2)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (36, 19)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (37, 2)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (37, 19)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (38, 2)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (38, 19)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (39, 2)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (39, 19)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (40, 2)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (40, 19)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (41, 2)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (41, 19)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (42, 2)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (42, 19)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (43, 2)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (43, 19)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (44, 2)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (44, 20)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (45, 2)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (45, 20)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (46, 2)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (46, 20)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (47, 2)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (47, 20)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (48, 2)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (48, 20)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (49, 2)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (49, 20)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (50, 2)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (50, 20)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (51, 2)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (51, 20)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (52, 2)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (52, 20)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (53, 2)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (53, 20)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (54, 2)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (54, 20)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (55, 2)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (55, 20)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (56, 2)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (56, 21)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (57, 2)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (57, 21)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (59, 2)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (59, 21)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (60, 2)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (60, 21)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (61, 2)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (61, 21)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (62, 2)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (62, 21)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (63, 2)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (63, 22)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (64, 2)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (64, 22)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (66, 2)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (66, 22)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (67, 2)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (67, 22)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (68, 2)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (68, 22)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (69, 2)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (69, 22)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (70, 3)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (70, 23)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (70, 28)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (71, 3)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (71, 23)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (71, 28)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (72, 3)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (72, 23)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (72, 28)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (74, 3)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (74, 23)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (74, 29)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (75, 3)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (75, 23)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (75, 29)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (76, 3)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (76, 23)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (76, 29)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (77, 3)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (77, 23)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (77, 30)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (78, 3)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (78, 24)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (78, 26)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (79, 3)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (79, 24)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (79, 26)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (80, 3)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (80, 24)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (80, 29)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (81, 3)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (81, 25)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (81, 26)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (82, 4)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (82, 32)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (83, 4)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (83, 32)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (84, 4)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (84, 32)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (85, 4)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (85, 32)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (86, 4)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (86, 33)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (87, 4)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (87, 33)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (88, 4)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (88, 33)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (89, 4)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (89, 33)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (91, 4)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (91, 34)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (92, 4)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (92, 34)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (93, 4)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (93, 35)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (94, 4)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (94, 35)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (95, 4)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (95, 35)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (96, 4)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (96, 35)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (97, 4)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (97, 36)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (98, 4)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (98, 36)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (100, 5)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (100, 37)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (101, 5)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (101, 37)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (102, 5)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (102, 37)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (103, 5)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (103, 37)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (104, 5)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (104, 38)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (105, 5)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (105, 38)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (106, 5)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (106, 39)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (106, 40)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (107, 5)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (107, 39)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (107, 40)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (108, 5)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (108, 40)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (108, 41)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (109, 5)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (109, 40)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (110, 5)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (110, 40)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (111, 5)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (111, 42)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (112, 5)
GO
INSERT [dbo].[product_category] ([fk_product_id], [fk_category_id]) VALUES (112, 42)
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
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (13, N'similac-neosure-370g.png', 8)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (14, N'similac-neosure-370g.jpg', 8)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (15, N'sua-abbott-grow-2-6-12-thang-900g.jpg', 9)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (16, N'sua-abbott-grow-2-6-12-thang-900g2.jpg', 9)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (17, N'enfamil-a-so-3-1700g-2flex.png', 10)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (18, N'enfamil-a-so-3-1700g-2flex2.png', 10)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (19, N'enfamil-a-so-3-1700g-2flex3.png', 10)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (20, N'similac-mom-huong-vani-900g.jpg', 11)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (21, N'meiji-infant-formula-800g-0-12-thang.jpg', 12)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (22, N'meiji-infant-formula-800g-0-12-thang2.jpg', 12)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (23, N'meiji-infant-formula-800g-0-12-thang3.jpg', 12)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (24, N'morinaga-so-1-hagukumi-0-6-thang-850g.jpg', 13)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (25, N'meiji-growing-up-formula-800g-1-3-tuoi.jpg', 14)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (26, N'meiji-growing-up-formula-800g-1-3-tuoi (1).jpg', 14)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (27, N'wakodo-lebens-mom-850g.png', 15)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (28, N'wakodo-lebens-mom-850g (1).png', 15)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (29, N'sua-bau-meiji-mama-milk-350g.jpg', 16)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (30, N'sua-bau-meiji-mama-milk-350g (1).jpg', 16)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (31, N'sua-bau-meiji-mama-milk-350g (2).jpg', 16)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (32, N'vinamilk-yoko-gold-3-2-6-tuoi-850g.jpg', 17)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (33, N'bellamy-s-organic-junior-milk-drink-so-4-900g-tren-3-tuoi.jpg', 18)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (34, N'dielac-grow-plus-2-2-10-tuoi-850g.jpg', 19)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (35, N'sua-colosbaby-gold-2-800g.jpg', 20)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (36, N'sb-vnm-kenko-haru-ht850g.jpg', 21)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (37, N'sua-colos-gain-1-800g-1-10-tuoi.jpg', 22)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (38, N'sua-humana-gold-plus-so-1-800g-0-6-thang.jpg', 23)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (39, N'hipp-2-organic-combiotic-350g-6-12-thang.jpg', 24)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (40, N'sua-nan-a2-infinipro-800g-so-2-1-2-tuoi.png', 25)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (41, N'sua-nan-a2-infinipro-800g-so-2-1-2-tuoi (1).png', 25)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (42, N'hipp-4-organic-combiotic-800g-tren-3-tuoi.png', 26)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (43, N'sua-nan-a2-infinipro-800g-so-3-2-6-tuoi.png', 27)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (44, N'sua-nan-a2-infinipro-800g-so-3-2-6-tuoi (1).png', 27)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (45, N'frisolac-gold-pro-so-3-800g-1-3-tuoi.png', 28)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (46, N'frisolac-gold-pro-so-3-800g-1-3-tuoi.jpg', 28)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (47, N'sua-dac-tri-nestle-nutren-junior-400g-1-10-tuoi.png', 29)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (48, N'friso-mum-gold-huong-cam-400g.jpg', 30)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (49, N'friso-mum-gold-huong-cam-400g (1).jpg', 30)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (50, N'friso-mum-gold-huong-cam-900g.jpg', 31)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (51, N'friso-mum-gold-huong-cam-400g (2).jpg', 31)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (52, N'sua-uong-dinh-duong-vinamilk-yoko-gold-180ml-loc-4.jpg', 32)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (53, N'sua-uong-dinh-duong-vinamilk-yoko-gold-180ml-loc-4 (1).jpg', 32)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (54, N'sua-uong-dinh-duong-optimum-gold-180ml-loc-4-hop.jpg', 33)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (55, N'sua-uong-dinh-duong-optimum-gold-180ml-loc-4-hop (1).jpg', 33)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (56, N'sua-non-vinamilk-colosgold-110ml-tu-1-tuoi-loc-4-hop.jpg', 34)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (57, N'sua-non-vinamilk-colosgold-110ml-tu-1-tuoi-loc-4-hop (1).jpg', 34)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (58, N'thuc-pham-bo-sung-nestle-nangrow-6-4x180ml.png', 35)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (59, N'thuc-pham-bo-sung-nestle-nangrow-6-4x180ml (1).png', 35)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (60, N'thuc-pham-bo-sung-sua-tiet-trung-similac-huong-vani-110ml-loc-4-hop.png', 36)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (61, N'thuc-pham-bo-sung-sua-tiet-trung-similac-huong-vani-110ml-loc-4-hop (1).png', 36)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (62, N'sua-uong-dinh-duong-dielac-grow-plus-110ml-sua-non-loc-4-hop.png', 37)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (63, N'sua-uong-dinh-duong-dielac-grow-plus-110ml-sua-non-loc-4-hop (1).png', 37)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (64, N'sua-dem-ngu-coc-fruto-nyanya-200ml.jpg', 38)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (65, N'sua-dem-yen-mach-vi-chuoi-fruto-nyanya-200ml.jpg', 39)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (66, N'sua-dem-gao-sua-fruto-nyanya-200ml.jpg', 40)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (67, N'thuc-pham-dinh-duong-y-hoc-cho-tre-1-10-tuoi-pediasure-dang-long-huong-vani-237ml-loc-6-chai.png', 41)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (68, N'sua-tuoi-tiet-trung-a2-milk-loc-6-hop.jpg', 42)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (69, N'sua-non-tuoi-vitadairy-180ml-loc-3-hop.jpg', 43)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (70, N'sua-tuoi-tiet-trung-oldenburger-it-duong-180ml-loc-4-hop.png', 44)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (71, N'sua-chua-hoa-qua-hff-dau-tay-loc-4-hu.jpg', 45)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (72, N'thung-sua-chua-uong-kun-huong-kem-dau-110ml-24-tui.png', 46)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (73, N'thung-sua-chua-uong-kun-huong-kem-dau-110ml-24-tui (1).png', 46)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (74, N'sua-chua-trai-cay-hff-organic-vi-chuoi-6x55g.jpg', 47)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (75, N'loc-5-chai-sua-uong-len-men-yakult-65ml.jpg', 48)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (76, N'thuc-uong-lua-mach-uong-lien-nestle-milo-180ml-loc-4-hop.jpg', 49)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (77, N'sua-chua-vinamilk-dau-100g.jpg', 50)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (78, N'sua-chua-vinamilk-it-duong-100g.jpg', 51)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (79, N'sua-chua-vinamilk-nha-dam-100g.jpg', 52)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (80, N'sua-chua-vinamilk-trai-cay-100g.jpg', 53)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (82, N'thuc-pham-bo-sung-sua-lua-mach-nestle-milo-110ml-loc-4-hop.png', 54)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (83, N'sua-tuoi-tiet-trung-co-duong-dutch-lady-180ml-loc-4-hop.jpg', 55)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (84, N'sua-tuoi-tiet-trung-th-true-milk-it-duong-110ml-loc-4-hop.jpg', 56)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (85, N'sua-tuoi-tiet-trung-nguyen-chat-th-true-milk-180ml-loc-4-hop.jpg', 57)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (86, N'sua-dau-den-oc-cho-hanh-nhan-190ml-loc-3.jpg', 59)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (87, N'sua-dem-gao-vi-mam-xoi-fruto-nyanya-loc-3-hop.jpg', 60)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (88, N'sua-hat-hanh-nhan-nguyen-chat-hieu-137oc-degrees-137oc-degrees-almond-milk-original.jpg', 61)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (89, N'sua-hat-oc-cho-nguyen-chat-hieu-137oc-degrees-137oc-degrees-walnut-milk-original.jpg', 62)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (90, N'nuoc-nhung-huou-vitamin-ki-young-12m.png', 63)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (91, N'nuoc-yen-sao-cao-cap-nunest-kids-vi-dau-70-ml-loc-3.jpg', 64)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (92, N'sua-tuoi-tiet-trung-dalat-milk-it-duong-110ml-loc-4-hop.jpg', 66)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (93, N'sua-dem-ngu-coc-vi-le-va-chuoi-agusha-200ml.png', 67)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (94, N'sua-ngay-ngu-coc-vi-dao-agusha-200ml.png', 68)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (95, N'nuoc-gao-han-quoc-morning-rice-1500-ml.jpg', 69)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (96, N'bim-ta-quan-moony-natural-m-46-mieng.jpg', 70)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (97, N'bim-ta-quan-moony-natural-m-46-mieng (1).jpg', 70)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (98, N'combo-3-goi-bim-ta-quan-sieu-cao-cap-nhat-ban-whito-m-58-mieng.jpg', 71)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (99, N'combo-3-goi-bim-ta-quan-sieu-cao-cap-nhat-ban-whito-m-58-mieng (1).jpg', 71)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (100, N'combo-2-goi-ta-quan-pampers-nhat-ban-new-m-6-11kg-48-mieng.jpg', 72)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (101, N'combo-2-goi-ta-quan-pampers-nhat-ban-new-m-6-11kg-48-mieng (1).jpg', 72)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (102, N'combo-2-goi-ta-quan-moony-l-be-trai-44-mieng.png', 74)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (103, N'combo-2-goi-ta-quan-moony-l-be-trai-44-mieng.jpg', 74)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (104, N'ta-quan-pampers-giu-dang-super-jumbo-size-l-68-mieng.jpg', 75)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (105, N'ta-quan-pampers-giu-dang-super-jumbo-size-l-68-mieng (1).jpg', 75)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (106, N'bim-ta-quan-bobby-l-68-mieng.jpg', 76)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (107, N'bim-ta-quan-bobby-l-68-mieng (1).jpg', 76)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (108, N'bim-ta-quan-moony-natural-xl-32-mieng.jpg', 77)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (109, N'bim-ta-quan-moony-natural-xl-32-mieng (1).jpg', 77)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (110, N'bim-ta-quan-moony-natural-xl-32-mieng (2).jpg', 77)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (111, N'bim-ta-dan-huggies-platinum-nature-made-size-newborn-60-mieng-duoi-5kg.jpg', 78)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (112, N'ta-dan-bobby-sieu-tham-kho-thoang-so-sinh-duoi-5kg-70-mieng.png', 79)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (113, N'bim-ta-dan-bobby-jumbo-sieu-mong-l-9-13kg-68-mieng.png', 80)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (114, N'mieng-lot-so-sinh-huggies-nb-1-56.jpg', 81)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (115, N'banh-gao-huu-co-gerber-organic-vi-xoai-chuoi-ca-rot.png', 82)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (116, N'banh-gam-nuou-ngu-coc-grinny-vi-dau-tay.png', 83)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (117, N'banh-gao-gerber-vi-dau-tao-cai-bo-xoi.png', 84)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (118, N'bot-an-dam-ridielac-gold-4-vi-man-hg-200g.jpg', 85)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (119, N'my-y-thit-than-xot-ca-chua-200g.png', 86)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (120, N'chao-tuoi-baby-ga-ca-rot-sg-food-10-thang-240g.jpg', 87)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (121, N'chao-tuoi-hai-san-thap-cam-cay-thi.png', 88)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (122, N'chao-tuoi-cay-thi-thit-bo.png', 89)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (123, N'thuyen-xua-an-dam-cho-con-gia-vi-rac-com-vi-rong-bien-19gr.jpg', 91)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (124, N'dau-olive-nguyen-chat-thuyen-xua-an-dam-cho-con-250ml.png', 92)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (125, N'keo-deo-haribo-goldbears-80g.jpg', 93)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (126, N'banh-que-pocky-huong-vi-so-co-la.png', 94)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (127, N'banh-que-pocky-vi-dau.png', 95)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (128, N'banh-gau-koala-s-march-nhan-so-co-la.jpg', 96)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (129, N'vang-sua-uong-zott-monte-huong-vani-4x95ml.jpg', 97)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (130, N'vang-sua-zott-monte-huong-vani-4x55g.png', 98)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (131, N'may-ham-sua-2-binh-gluck-gn05-xanh-da-troi.jpg', 100)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (132, N'binh-sua-edison-ppsu-240ml-xanh.jpg', 101)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (133, N'binh-sua-edison-ppsu-240ml-xanh (1).jpg', 101)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (134, N'bo-hai-binh-sua-silicone-comotomo-250ml-xanh-.jpg', 102)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (135, N'2-2024-05-08-1825-bo-hai-binh-sua-silicone-comotomo-250ml-xanh.webp', 102)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (136, N'binh-sua-edison-ppsu-160ml-hong.jpg', 103)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (138, N'chan-luoi-cho-be-animo-b2201-br001-70x90cm-hong.jpg', 104)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (139, N'noi-tu-dong-autoru-eco-25-xanh-nhat.jpg', 105)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (140, N'noi-tu-dong-autoru-eco-25-xanh-nhat (1).jpg', 105)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (141, N'noi-tu-dong-autoru-eco-25-xanh-nhat (2).jpg', 105)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (142, N'may-hut-sua-ranh-tay-animo.png', 106)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (143, N'may-hut-sua-ranh-tay-animo.jpg', 106)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (144, N'may-hut-sua-dien-don-gluck-gp31.jpg', 107)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (145, N'5438c1133c35bb9a165cbc37cd192f93.webp', 107)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (146, N'tui-tru-sua-gluck-baby-3d-double-zip-250ml-50-tui.jpg', 108)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (147, N'sua-rua-mat-tao-bot-senka-perfect-whip-120g.jpg', 109)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (148, N'dung-dich-ve-sinh-phu-nu-lactacyd-odor-fresh-ngan-mui-250ml.png', 110)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (149, N'khan-uot-diu-nhe-animo-khong-mui-100-to.png', 111)
GO
INSERT [dbo].[product_image] ([image_id], [image_path], [fk_product_id]) VALUES (150, N'khan-uot-huggies-80-mieng.png', 112)
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
