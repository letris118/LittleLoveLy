package interfaces;

import com.vtcorp.store.dtos.ProductDTO;
import com.vtcorp.store.entities.Product;

import java.util.List;

public interface IProductService {
    List<Product> getActiveProducts();
    Product getProductById(Long id);
    Product saveProduct(ProductDTO productDTO);
    Product updateProduct(ProductDTO productDTO);
}
