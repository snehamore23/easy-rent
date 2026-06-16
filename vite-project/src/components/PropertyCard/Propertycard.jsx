import React from 'react';
import { VectorSquare, Building2, HandCoins } from "lucide-react";
import './PropertyCard.css';
import DefaultImage from '../../assets/1.jpg';
import Button from '../Button/Button';
import { useNavigate } from 'react-router-dom';

function PropertyCard({ id, title,description, city, propertyType, size, rating, pricePerMonth , photos}) {
        const priceLabel = (pricePerMonth === undefined || pricePerMonth === null)
                ? '—'
                : `₹${pricePerMonth.toLocaleString()}/mo`;
 const navigate = useNavigate();
        return (
                <div className="property-card">
                        <div className="property-card__image">
                                <img src={(photos && photos.length > 0) ? photos[0] : DefaultImage} alt={title || 'property'} className="property-img" />
                        </div>
                        <div className="property-card__body">
                                <h3 className="property-card__title">{title}</h3>
                                <p>{description}</p>
                                <p><VectorSquare/>{size} sq ft </p>
                                <p><Building2/>{propertyType}</p>
                                <p><HandCoins />₹{pricePerMonth?.toLocaleString()}/mo</p>
                                <div className="property-card__rating">⭐ {rating}</div>
                        </div>
                        <div className="card-action">
                                <Button title="Know More" onClick={() => navigate(`/property/${id}`)} />
                        </div>
                </div>
        );
}
export default PropertyCard;
