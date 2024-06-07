package interfaces;

import com.vtcorp.store.entities.Product;
import com.vtcorp.store.repositories.ProductRepository;

import java.util.List;
import java.util.Optional;

public interface IProductService {
    public List<Product> getActiveProducts();
    public Product geProductById(Long id);

}
