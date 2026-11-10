-- CreateTable
CREATE TABLE `room_types` (
    `id` VARCHAR(36) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `slug` VARCHAR(100) NOT NULL,
    `description` TEXT NULL,
    `shortDescription` VARCHAR(255) NULL,
    `maxAdults` INTEGER NOT NULL DEFAULT 2,
    `maxChildren` INTEGER NOT NULL DEFAULT 1,
    `maxOccupancy` INTEGER NOT NULL DEFAULT 3,
    `basePrice` DECIMAL(12, 2) NOT NULL,
    `sizeSqFt` INTEGER NULL,
    `bedConfiguration` VARCHAR(100) NULL,
    `amenities` JSON NULL,
    `isPublished` BOOLEAN NOT NULL DEFAULT true,
    `sortOrder` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `room_types_slug_key`(`slug`),
    INDEX `room_types_isPublished_sortOrder_idx`(`isPublished`, `sortOrder`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rooms` (
    `id` VARCHAR(36) NOT NULL,
    `roomTypeId` VARCHAR(36) NOT NULL,
    `roomNumber` VARCHAR(20) NOT NULL,
    `floorLabel` VARCHAR(50) NULL,
    `operationalStatus` ENUM('ACTIVE', 'MAINTENANCE', 'OUT_OF_SERVICE') NOT NULL DEFAULT 'ACTIVE',
    `isBookable` BOOLEAN NOT NULL DEFAULT true,
    `notes` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `rooms_roomNumber_key`(`roomNumber`),
    INDEX `rooms_roomTypeId_operationalStatus_idx`(`roomTypeId`, `operationalStatus`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `room_images` (
    `id` VARCHAR(36) NOT NULL,
    `roomTypeId` VARCHAR(36) NOT NULL,
    `storagePath` VARCHAR(255) NOT NULL,
    `altText` VARCHAR(255) NULL,
    `isCover` BOOLEAN NOT NULL DEFAULT false,
    `sortOrder` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `room_images_roomTypeId_sortOrder_idx`(`roomTypeId`, `sortOrder`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rate_plans` (
    `id` VARCHAR(36) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `code` VARCHAR(50) NOT NULL,
    `description` TEXT NULL,
    `mealPlan` VARCHAR(50) NULL,
    `cancellationPolicy` TEXT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `rate_plans_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `room_rates` (
    `id` VARCHAR(36) NOT NULL,
    `roomTypeId` VARCHAR(36) NOT NULL,
    `ratePlanId` VARCHAR(36) NOT NULL,
    `validFrom` DATE NOT NULL,
    `validTo` DATE NOT NULL,
    `dayOfWeek` INTEGER NULL,
    `baseAmount` DECIMAL(12, 2) NOT NULL,
    `currency` VARCHAR(3) NOT NULL DEFAULT 'INR',
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `room_rates_roomTypeId_validFrom_validTo_isActive_idx`(`roomTypeId`, `validFrom`, `validTo`, `isActive`),
    INDEX `room_rates_ratePlanId_idx`(`ratePlanId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `room_inventory` (
    `id` VARCHAR(36) NOT NULL,
    `roomTypeId` VARCHAR(36) NOT NULL,
    `stayDate` DATE NOT NULL,
    `totalUnits` INTEGER NOT NULL,
    `bookedUnits` INTEGER NOT NULL DEFAULT 0,
    `blockedUnits` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `room_inventory_stayDate_roomTypeId_idx`(`stayDate`, `roomTypeId`),
    UNIQUE INDEX `room_inventory_roomTypeId_stayDate_key`(`roomTypeId`, `stayDate`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `guests` (
    `id` VARCHAR(36) NOT NULL,
    `fullName` VARCHAR(150) NOT NULL,
    `phone` VARCHAR(30) NOT NULL,
    `email` VARCHAR(150) NULL,
    `address` TEXT NULL,
    `city` VARCHAR(100) NULL,
    `state` VARCHAR(100) NULL,
    `pincode` VARCHAR(20) NULL,
    `country` VARCHAR(100) NOT NULL DEFAULT 'India',
    `idType` VARCHAR(50) NULL,
    `idNumberEncrypted` VARCHAR(255) NULL,
    `notes` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `guests_phone_idx`(`phone`),
    INDEX `guests_email_idx`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `bookings` (
    `id` VARCHAR(36) NOT NULL,
    `bookingReference` VARCHAR(30) NOT NULL,
    `leadGuestId` VARCHAR(36) NOT NULL,
    `checkIn` DATE NOT NULL,
    `checkOut` DATE NOT NULL,
    `adults` INTEGER NOT NULL DEFAULT 1,
    `children` INTEGER NOT NULL DEFAULT 0,
    `status` ENUM('PENDING', 'AWAITING_PAYMENT', 'CONFIRMED', 'CHECKED_IN', 'CHECKED_OUT', 'CANCELLED', 'REFUND_PENDING', 'REFUNDED', 'NO_SHOW', 'EXPIRED') NOT NULL DEFAULT 'PENDING',
    `source` ENUM('WEBSITE', 'WHATSAPP', 'PHONE', 'WALK_IN', 'ADMIN') NOT NULL DEFAULT 'WEBSITE',
    `subtotal` DECIMAL(12, 2) NOT NULL,
    `taxAmount` DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
    `discountAmount` DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
    `totalAmount` DECIMAL(12, 2) NOT NULL,
    `currency` VARCHAR(3) NOT NULL DEFAULT 'INR',
    `priceSnapshot` JSON NOT NULL,
    `policySnapshot` JSON NOT NULL,
    `specialRequests` TEXT NULL,
    `checkedInAt` DATETIME(3) NULL,
    `checkedOutAt` DATETIME(3) NULL,
    `cancelledAt` DATETIME(3) NULL,
    `cancellationReason` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `bookings_bookingReference_key`(`bookingReference`),
    INDEX `bookings_status_checkIn_checkOut_idx`(`status`, `checkIn`, `checkOut`),
    INDEX `bookings_bookingReference_idx`(`bookingReference`),
    INDEX `bookings_leadGuestId_idx`(`leadGuestId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `booking_rooms` (
    `id` VARCHAR(36) NOT NULL,
    `bookingId` VARCHAR(36) NOT NULL,
    `roomTypeId` VARCHAR(36) NOT NULL,
    `roomId` VARCHAR(36) NULL,
    `ratePlanId` VARCHAR(36) NULL,
    `quantity` INTEGER NOT NULL DEFAULT 1,
    `nightlyRateSnapshot` JSON NOT NULL,
    `occupancySnapshot` JSON NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `booking_rooms_bookingId_idx`(`bookingId`),
    INDEX `booking_rooms_roomTypeId_idx`(`roomTypeId`),
    INDEX `booking_rooms_roomId_idx`(`roomId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `booking_enquiries` (
    `id` VARCHAR(36) NOT NULL,
    `guestName` VARCHAR(150) NOT NULL,
    `phone` VARCHAR(30) NOT NULL,
    `email` VARCHAR(150) NULL,
    `checkIn` DATE NULL,
    `checkOut` DATE NULL,
    `adults` INTEGER NULL DEFAULT 1,
    `children` INTEGER NULL DEFAULT 0,
    `preferredRoomTypeId` VARCHAR(36) NULL,
    `message` TEXT NULL,
    `status` ENUM('PENDING', 'CONTACTED', 'CONVERTED', 'CLOSED', 'CANCELLED') NOT NULL DEFAULT 'PENDING',
    `adminNotes` TEXT NULL,
    `convertedBookingId` VARCHAR(36) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `booking_enquiries_status_createdAt_idx`(`status`, `createdAt`),
    INDEX `booking_enquiries_phone_idx`(`phone`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `booking_holds` (
    `id` VARCHAR(36) NOT NULL,
    `holdTokenHash` VARCHAR(64) NOT NULL,
    `roomTypeId` VARCHAR(36) NOT NULL,
    `guestId` VARCHAR(36) NULL,
    `checkIn` DATE NOT NULL,
    `checkOut` DATE NOT NULL,
    `quantity` INTEGER NOT NULL DEFAULT 1,
    `status` ENUM('ACTIVE', 'CONVERTED', 'EXPIRED', 'RELEASED') NOT NULL DEFAULT 'ACTIVE',
    `expiresAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `booking_holds_holdTokenHash_key`(`holdTokenHash`),
    INDEX `booking_holds_expiresAt_status_idx`(`expiresAt`, `status`),
    INDEX `booking_holds_holdTokenHash_idx`(`holdTokenHash`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `restaurants` (
    `id` VARCHAR(36) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `description` TEXT NULL,
    `openingTime` VARCHAR(10) NULL,
    `closingTime` VARCHAR(10) NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `menu_categories` (
    `id` VARCHAR(36) NOT NULL,
    `restaurantId` VARCHAR(36) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `slug` VARCHAR(100) NOT NULL,
    `description` TEXT NULL,
    `sortOrder` INTEGER NOT NULL DEFAULT 0,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `menu_categories_restaurantId_sortOrder_idx`(`restaurantId`, `sortOrder`),
    UNIQUE INDEX `menu_categories_restaurantId_slug_key`(`restaurantId`, `slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `menu_items` (
    `id` VARCHAR(36) NOT NULL,
    `categoryId` VARCHAR(36) NOT NULL,
    `name` VARCHAR(150) NOT NULL,
    `description` TEXT NULL,
    `imagePath` VARCHAR(255) NULL,
    `price` DECIMAL(12, 2) NOT NULL,
    `currency` VARCHAR(3) NOT NULL DEFAULT 'INR',
    `dietaryType` ENUM('VEGETARIAN', 'NON_VEGETARIAN', 'EGG', 'VEGAN', 'JAIN') NOT NULL DEFAULT 'VEGETARIAN',
    `isAvailable` BOOLEAN NOT NULL DEFAULT true,
    `preparationMinutes` INTEGER NULL DEFAULT 20,
    `sortOrder` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `menu_items_categoryId_isAvailable_idx`(`categoryId`, `isAvailable`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `menu_item_variants` (
    `id` VARCHAR(36) NOT NULL,
    `menuItemId` VARCHAR(36) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `priceDelta` DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
    `isAvailable` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `menu_item_variants_menuItemId_idx`(`menuItemId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `restaurant_tables` (
    `id` VARCHAR(36) NOT NULL,
    `restaurantId` VARCHAR(36) NOT NULL,
    `tableNumber` VARCHAR(20) NOT NULL,
    `sectionLabel` VARCHAR(50) NULL,
    `capacity` INTEGER NOT NULL DEFAULT 4,
    `status` ENUM('AVAILABLE', 'OCCUPIED', 'RESERVED', 'CLEANING', 'OUT_OF_SERVICE') NOT NULL DEFAULT 'AVAILABLE',
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `restaurant_tables_restaurantId_status_idx`(`restaurantId`, `status`),
    UNIQUE INDEX `restaurant_tables_restaurantId_tableNumber_key`(`restaurantId`, `tableNumber`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `table_sessions` (
    `id` VARCHAR(36) NOT NULL,
    `tableId` VARCHAR(36) NOT NULL,
    `qrAssignmentId` VARCHAR(36) NULL,
    `guestIdentifier` VARCHAR(100) NULL,
    `openedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `closedAt` DATETIME(3) NULL,
    `status` ENUM('OPEN', 'BILLED', 'CLOSED', 'CANCELLED') NOT NULL DEFAULT 'OPEN',
    `notes` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `table_sessions_tableId_status_idx`(`tableId`, `status`),
    INDEX `table_sessions_openedAt_idx`(`openedAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `orders` (
    `id` VARCHAR(36) NOT NULL,
    `orderNumber` VARCHAR(30) NOT NULL,
    `tableSessionId` VARCHAR(36) NULL,
    `bookingId` VARCHAR(36) NULL,
    `roomId` VARCHAR(36) NULL,
    `orderType` ENUM('DINE_IN', 'ROOM_SERVICE', 'TAKEAWAY') NOT NULL DEFAULT 'DINE_IN',
    `status` ENUM('PLACED', 'ACCEPTED', 'REJECTED', 'PREPARING', 'READY', 'SERVED', 'COMPLETED', 'CANCELLED') NOT NULL DEFAULT 'PLACED',
    `subtotal` DECIMAL(12, 2) NOT NULL,
    `taxAmount` DECIMAL(12, 2) NOT NULL DEFAULT 0.00,
    `totalAmount` DECIMAL(12, 2) NOT NULL,
    `specialInstructions` TEXT NULL,
    `estimatedReadyAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `orders_orderNumber_key`(`orderNumber`),
    INDEX `orders_status_createdAt_idx`(`status`, `createdAt`),
    INDEX `orders_orderNumber_idx`(`orderNumber`),
    INDEX `orders_tableSessionId_idx`(`tableSessionId`),
    INDEX `orders_roomId_idx`(`roomId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `order_items` (
    `id` VARCHAR(36) NOT NULL,
    `orderId` VARCHAR(36) NOT NULL,
    `menuItemId` VARCHAR(36) NULL,
    `itemNameSnapshot` VARCHAR(150) NOT NULL,
    `unitPriceSnapshot` DECIMAL(12, 2) NOT NULL,
    `quantity` INTEGER NOT NULL DEFAULT 1,
    `variantSnapshot` JSON NULL,
    `lineTotal` DECIMAL(12, 2) NOT NULL,
    `notes` VARCHAR(255) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `order_items_orderId_idx`(`orderId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `qr_assignments` (
    `id` VARCHAR(36) NOT NULL,
    `tokenHash` VARCHAR(64) NOT NULL,
    `targetType` ENUM('TABLE', 'ROOM') NOT NULL,
    `tableId` VARCHAR(36) NULL,
    `roomId` VARCHAR(36) NULL,
    `status` ENUM('ACTIVE', 'INACTIVE', 'REVOKED') NOT NULL DEFAULT 'ACTIVE',
    `expiresAt` DATETIME(3) NULL,
    `revokedAt` DATETIME(3) NULL,
    `revokedReason` VARCHAR(255) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `qr_assignments_tokenHash_key`(`tokenHash`),
    INDEX `qr_assignments_tokenHash_idx`(`tokenHash`),
    INDEX `qr_assignments_targetType_status_idx`(`targetType`, `status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `service_types` (
    `id` VARCHAR(36) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `code` VARCHAR(50) NOT NULL,
    `description` TEXT NULL,
    `defaultPriority` ENUM('LOW', 'NORMAL', 'HIGH', 'URGENT') NOT NULL DEFAULT 'NORMAL',
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `service_types_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `room_service_requests` (
    `id` VARCHAR(36) NOT NULL,
    `roomId` VARCHAR(36) NOT NULL,
    `bookingId` VARCHAR(36) NULL,
    `serviceTypeId` VARCHAR(36) NOT NULL,
    `description` TEXT NULL,
    `status` ENUM('SUBMITTED', 'ACCEPTED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED', 'REJECTED') NOT NULL DEFAULT 'SUBMITTED',
    `priority` ENUM('LOW', 'NORMAL', 'HIGH', 'URGENT') NOT NULL DEFAULT 'NORMAL',
    `assignedStaffNotes` TEXT NULL,
    `completedAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `room_service_requests_status_createdAt_idx`(`status`, `createdAt`),
    INDEX `room_service_requests_roomId_idx`(`roomId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `payments` (
    `id` VARCHAR(36) NOT NULL,
    `bookingId` VARCHAR(36) NULL,
    `orderId` VARCHAR(36) NULL,
    `provider` VARCHAR(50) NOT NULL DEFAULT 'RAZORPAY',
    `providerOrderId` VARCHAR(100) NULL,
    `providerPaymentId` VARCHAR(100) NULL,
    `providerSignature` VARCHAR(255) NULL,
    `amount` DECIMAL(12, 2) NOT NULL,
    `currency` VARCHAR(3) NOT NULL DEFAULT 'INR',
    `method` ENUM('ONLINE_UPI', 'ONLINE_CARD', 'ONLINE_NETBANKING', 'CASH', 'CARD_SWIPE', 'PAY_AT_PROPERTY') NOT NULL DEFAULT 'ONLINE_UPI',
    `status` ENUM('CREATED', 'PENDING', 'AUTHORIZED', 'CAPTURED', 'FAILED', 'PARTIALLY_REFUNDED', 'REFUNDED') NOT NULL DEFAULT 'CREATED',
    `idempotencyKey` VARCHAR(100) NOT NULL,
    `verifiedAt` DATETIME(3) NULL,
    `rawResponse` JSON NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `payments_idempotencyKey_key`(`idempotencyKey`),
    INDEX `payments_status_createdAt_idx`(`status`, `createdAt`),
    INDEX `payments_providerPaymentId_idx`(`providerPaymentId`),
    INDEX `payments_bookingId_idx`(`bookingId`),
    INDEX `payments_orderId_idx`(`orderId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `refunds` (
    `id` VARCHAR(36) NOT NULL,
    `paymentId` VARCHAR(36) NOT NULL,
    `providerRefundId` VARCHAR(100) NULL,
    `amount` DECIMAL(12, 2) NOT NULL,
    `currency` VARCHAR(3) NOT NULL DEFAULT 'INR',
    `status` ENUM('PENDING', 'PROCESSED', 'FAILED') NOT NULL DEFAULT 'PENDING',
    `reason` TEXT NULL,
    `processedAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `refunds_paymentId_idx`(`paymentId`),
    INDEX `refunds_status_idx`(`status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `website_pages` (
    `id` VARCHAR(36) NOT NULL,
    `slug` VARCHAR(100) NOT NULL,
    `title` VARCHAR(200) NOT NULL,
    `metaTitle` VARCHAR(255) NULL,
    `metaDescription` TEXT NULL,
    `content` JSON NULL,
    `isPublished` BOOLEAN NOT NULL DEFAULT true,
    `publishedAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `website_pages_slug_key`(`slug`),
    INDEX `website_pages_slug_isPublished_idx`(`slug`, `isPublished`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `website_sections` (
    `id` VARCHAR(36) NOT NULL,
    `pageId` VARCHAR(36) NOT NULL,
    `sectionKey` VARCHAR(100) NOT NULL,
    `title` VARCHAR(200) NULL,
    `subtitle` VARCHAR(255) NULL,
    `content` JSON NULL,
    `sortOrder` INTEGER NOT NULL DEFAULT 0,
    `isVisible` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `website_sections_pageId_sortOrder_idx`(`pageId`, `sortOrder`),
    UNIQUE INDEX `website_sections_pageId_sectionKey_key`(`pageId`, `sectionKey`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `media_assets` (
    `id` VARCHAR(36) NOT NULL,
    `title` VARCHAR(200) NULL,
    `storagePath` VARCHAR(255) NOT NULL,
    `fileType` VARCHAR(50) NOT NULL,
    `fileSizeBytes` INTEGER NULL,
    `altText` VARCHAR(255) NULL,
    `category` VARCHAR(50) NOT NULL DEFAULT 'GENERAL',
    `isVerified` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `media_assets_category_idx`(`category`),
    INDEX `media_assets_storagePath_idx`(`storagePath`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `offers` (
    `id` VARCHAR(36) NOT NULL,
    `title` VARCHAR(200) NOT NULL,
    `code` VARCHAR(50) NULL,
    `description` TEXT NULL,
    `discountType` ENUM('PERCENTAGE', 'FLAT_AMOUNT') NOT NULL DEFAULT 'PERCENTAGE',
    `discountValue` DECIMAL(12, 2) NOT NULL,
    `minBookingAmount` DECIMAL(12, 2) NULL,
    `validFrom` DATETIME(3) NOT NULL,
    `validTo` DATETIME(3) NOT NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `bannerImagePath` VARCHAR(255) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `offers_code_key`(`code`),
    INDEX `offers_validFrom_validTo_isActive_idx`(`validFrom`, `validTo`, `isActive`),
    INDEX `offers_code_idx`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `notifications` (
    `id` VARCHAR(36) NOT NULL,
    `channel` ENUM('EMAIL', 'WHATSAPP', 'SMS', 'IN_APP') NOT NULL DEFAULT 'EMAIL',
    `recipient` VARCHAR(150) NOT NULL,
    `subject` VARCHAR(255) NULL,
    `content` TEXT NOT NULL,
    `status` ENUM('PENDING', 'SENT', 'FAILED', 'READ') NOT NULL DEFAULT 'PENDING',
    `referenceType` VARCHAR(50) NULL,
    `referenceId` VARCHAR(36) NULL,
    `attemptCount` INTEGER NOT NULL DEFAULT 0,
    `lastError` TEXT NULL,
    `sentAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `notifications_status_channel_idx`(`status`, `channel`),
    INDEX `notifications_referenceType_referenceId_idx`(`referenceType`, `referenceId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `audit_logs` (
    `id` VARCHAR(36) NOT NULL,
    `actorId` VARCHAR(36) NULL,
    `actorType` VARCHAR(50) NOT NULL DEFAULT 'SYSTEM',
    `action` VARCHAR(100) NOT NULL,
    `entityType` VARCHAR(100) NOT NULL,
    `entityId` VARCHAR(36) NULL,
    `metadata` JSON NULL,
    `ipAddress` VARCHAR(45) NULL,
    `userAgent` VARCHAR(255) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `audit_logs_entityType_entityId_createdAt_idx`(`entityType`, `entityId`, `createdAt`),
    INDEX `audit_logs_action_createdAt_idx`(`action`, `createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `rooms` ADD CONSTRAINT `rooms_roomTypeId_fkey` FOREIGN KEY (`roomTypeId`) REFERENCES `room_types`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `room_images` ADD CONSTRAINT `room_images_roomTypeId_fkey` FOREIGN KEY (`roomTypeId`) REFERENCES `room_types`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `room_rates` ADD CONSTRAINT `room_rates_roomTypeId_fkey` FOREIGN KEY (`roomTypeId`) REFERENCES `room_types`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `room_rates` ADD CONSTRAINT `room_rates_ratePlanId_fkey` FOREIGN KEY (`ratePlanId`) REFERENCES `rate_plans`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `room_inventory` ADD CONSTRAINT `room_inventory_roomTypeId_fkey` FOREIGN KEY (`roomTypeId`) REFERENCES `room_types`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bookings` ADD CONSTRAINT `bookings_leadGuestId_fkey` FOREIGN KEY (`leadGuestId`) REFERENCES `guests`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `booking_rooms` ADD CONSTRAINT `booking_rooms_bookingId_fkey` FOREIGN KEY (`bookingId`) REFERENCES `bookings`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `booking_rooms` ADD CONSTRAINT `booking_rooms_roomTypeId_fkey` FOREIGN KEY (`roomTypeId`) REFERENCES `room_types`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `booking_rooms` ADD CONSTRAINT `booking_rooms_roomId_fkey` FOREIGN KEY (`roomId`) REFERENCES `rooms`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `booking_rooms` ADD CONSTRAINT `booking_rooms_ratePlanId_fkey` FOREIGN KEY (`ratePlanId`) REFERENCES `rate_plans`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `booking_enquiries` ADD CONSTRAINT `booking_enquiries_preferredRoomTypeId_fkey` FOREIGN KEY (`preferredRoomTypeId`) REFERENCES `room_types`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `booking_holds` ADD CONSTRAINT `booking_holds_roomTypeId_fkey` FOREIGN KEY (`roomTypeId`) REFERENCES `room_types`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `booking_holds` ADD CONSTRAINT `booking_holds_guestId_fkey` FOREIGN KEY (`guestId`) REFERENCES `guests`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `menu_categories` ADD CONSTRAINT `menu_categories_restaurantId_fkey` FOREIGN KEY (`restaurantId`) REFERENCES `restaurants`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `menu_items` ADD CONSTRAINT `menu_items_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `menu_categories`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `menu_item_variants` ADD CONSTRAINT `menu_item_variants_menuItemId_fkey` FOREIGN KEY (`menuItemId`) REFERENCES `menu_items`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `restaurant_tables` ADD CONSTRAINT `restaurant_tables_restaurantId_fkey` FOREIGN KEY (`restaurantId`) REFERENCES `restaurants`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `table_sessions` ADD CONSTRAINT `table_sessions_tableId_fkey` FOREIGN KEY (`tableId`) REFERENCES `restaurant_tables`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `table_sessions` ADD CONSTRAINT `table_sessions_qrAssignmentId_fkey` FOREIGN KEY (`qrAssignmentId`) REFERENCES `qr_assignments`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `orders_tableSessionId_fkey` FOREIGN KEY (`tableSessionId`) REFERENCES `table_sessions`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `orders_bookingId_fkey` FOREIGN KEY (`bookingId`) REFERENCES `bookings`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `orders_roomId_fkey` FOREIGN KEY (`roomId`) REFERENCES `rooms`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order_items` ADD CONSTRAINT `order_items_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `orders`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order_items` ADD CONSTRAINT `order_items_menuItemId_fkey` FOREIGN KEY (`menuItemId`) REFERENCES `menu_items`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `qr_assignments` ADD CONSTRAINT `qr_assignments_tableId_fkey` FOREIGN KEY (`tableId`) REFERENCES `restaurant_tables`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `qr_assignments` ADD CONSTRAINT `qr_assignments_roomId_fkey` FOREIGN KEY (`roomId`) REFERENCES `rooms`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `room_service_requests` ADD CONSTRAINT `room_service_requests_roomId_fkey` FOREIGN KEY (`roomId`) REFERENCES `rooms`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `room_service_requests` ADD CONSTRAINT `room_service_requests_bookingId_fkey` FOREIGN KEY (`bookingId`) REFERENCES `bookings`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `room_service_requests` ADD CONSTRAINT `room_service_requests_serviceTypeId_fkey` FOREIGN KEY (`serviceTypeId`) REFERENCES `service_types`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `payments` ADD CONSTRAINT `payments_bookingId_fkey` FOREIGN KEY (`bookingId`) REFERENCES `bookings`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `payments` ADD CONSTRAINT `payments_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `orders`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `refunds` ADD CONSTRAINT `refunds_paymentId_fkey` FOREIGN KEY (`paymentId`) REFERENCES `payments`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `website_sections` ADD CONSTRAINT `website_sections_pageId_fkey` FOREIGN KEY (`pageId`) REFERENCES `website_pages`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

