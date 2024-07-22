package com.vtcorp.store.services;

import com.vtcorp.store.dtos.GiftRequestDTO;
import com.vtcorp.store.dtos.GiftResponseDTO;
import com.vtcorp.store.entities.Gift;
import com.vtcorp.store.entities.ProductImage;
import com.vtcorp.store.mappers.GiftMapper;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.vtcorp.store.repositories.GiftRepository;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Date;
import java.util.List;

@Service
public class GiftService {

    private static final String UPLOAD_DIR = "src/main/resources/static/images/gifts";
    private final GiftRepository giftRepository;
    private final GiftMapper giftMapper;

    @Autowired
    public GiftService(GiftRepository giftRepository, GiftMapper giftMapper) {
        this.giftRepository = giftRepository;
        this.giftMapper = giftMapper;
    }

    public List<GiftResponseDTO> getAllGifts() {
        return giftMapper.toResponseDTOs(giftRepository.findAll());
    }

    public List<GiftResponseDTO> getActiveGifts() {
        return giftMapper.toResponseDTOs(giftRepository.findByActive(true));
    }

    public GiftResponseDTO getGiftById(Long id) {
        return giftMapper.toResponseDTO(giftRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Gift not found")));
    }

    @Transactional
    public GiftResponseDTO addGift(GiftRequestDTO giftRequestDTO) {
        Gift gift = giftMapper.toEntity(giftRequestDTO);
        String image = handleGiftImage(giftRequestDTO.getNewImageFile());
        gift.setActive(true);
        gift.setImagePath(image);
        return giftMapper.toResponseDTO(giftRepository.save(gift));
    }

    //Not complete yet
    @Transactional
    public GiftResponseDTO updateGift(GiftRequestDTO giftRequestDTO) {
        Gift gift = giftRepository.findById(giftRequestDTO.getGiftId())
                .orElseThrow(() -> new RuntimeException("Gift not found"));
        String image = "";
        if (giftRequestDTO.getNewImageFile() == null || giftRequestDTO.getNewImageFile().isEmpty()) {
            image = gift.getImagePath();
        } else {
            removeImage(gift.getImagePath());
            image = handleGiftImage(giftRequestDTO.getNewImageFile());
        }
        giftMapper.updateEntity(giftRequestDTO, gift);
        gift.setImagePath(image);
        return giftMapper.toResponseDTO(giftRepository.save(gift));
    }

    public String deactivateProduct(long id) {
        giftRepository.setActivateGift(false, id);
        return "Gift deactivated";
    }

    public String activateProduct(long id) {
        giftRepository.setActivateGift(true, id);
        return "Gift activated";
    }

    private String handleGiftImage(MultipartFile imageFile) {
        String storedFileName = null;
        if (imageFile != null) {
            Path uploadPath = Paths.get(UPLOAD_DIR);
            try {
                if (!Files.exists(uploadPath)) {
                    Files.createDirectories(uploadPath);
                }
                storedFileName = (new Date()).getTime() + "_" + imageFile.getOriginalFilename();
                try (InputStream inputStream = imageFile.getInputStream()) {
                    Files.copy(inputStream, Paths.get(UPLOAD_DIR, storedFileName), StandardCopyOption.REPLACE_EXISTING);
                } catch (IOException e) {
                    throw new RuntimeException("Failed to save image", e);
                }

            } catch (Exception e) {
                throw new RuntimeException("Failed to create upload directory", e);
            }
        }
        return storedFileName;
    }

    private void removeImage(String image) {
        Path imagePath = Paths.get(UPLOAD_DIR, image);
        try {
            Files.deleteIfExists(imagePath);
        } catch (IOException e) {
            throw new RuntimeException("Failed to delete image", e);
        }
    }

}
