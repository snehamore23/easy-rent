import React from 'react';
import { VectorSquare, Building2, HandCoins } from "lucide-react";
import './PropertyCard.css';
import DummyImage from './building.png';

function PropertyCard({ id, title,description, city, propertyType, size, rating, pricePerMonth }) {
        const priceLabel = (pricePerMonth === undefined || pricePerMonth === null)
                ? '—'
                : `₹${pricePerMonth.toLocaleString()}/mo`;

        return (
                <div className="property-card">
                        <div className="property-card__image">
                                <img src={DummyImage} alt={title || 'property'} className="property-img" />
                        </div>
                        <div className="property-card__body">
                                <h3 className="property-card__title">{title}</h3>
                                <p>{description}</p>
                                <p><VectorSquare/>{size} sq ft </p>
                                <p><Building2/>{propertyType}</p>
                                <p><HandCoins />₹{pricePerMonth?.toLocaleString()}/mo</p>
                                <div className="property-card__rating">⭐ {rating}</div>
                        </div>
                </div>
        );
}
export default PropertyCard;
