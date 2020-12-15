package edu.uwb.ii.warehouse.components.OrdersHistory;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderHistoryRepository extends MongoRepository<OrderHistoryModel, String> {

}
