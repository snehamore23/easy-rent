import "./Properties.css"
import { properties } from '../../views/data.jsx';
import PropertyCard from '../../components/PropertyCard/Propertycard';

function Properties() {
    return (
        <div>
            <h1>Properties</h1>
            <div className="properties-container">
            {properties.map((propertyObj) => {
                const { id, title, city, description, propertyType, size, rating, pricePerMonth } = propertyObj;
                return (
                    <PropertyCard
                        key={id}
                        title={title}
                        city={city}
                        description={description}
                        propertyType={propertyType}
                        size={size}
                        rating={rating}
                        pricePerMonth={pricePerMonth}
                        
                    />
                );
            })}
        </div>
        </div>
    );
}

export default Properties;
