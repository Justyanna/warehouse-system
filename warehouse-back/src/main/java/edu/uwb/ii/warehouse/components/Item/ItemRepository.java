package edu.uwb.ii.warehouse.components.Item;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemRepository extends MongoRepository<ItemModel, String> {

}
