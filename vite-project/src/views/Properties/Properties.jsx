import "./Properties.css";
import { properties as allProperties } from '../../views/data.jsx';
import PropertyCard from '../../components/PropertyCard/Propertycard';
import React, { useState, useEffect } from "react";
import Input from '../../components/Input/Input.jsx';
import house-image from'../../componnts/properties/

function Properties() {
    const [visibleProperties, setVisibleProperties] = useState(allProperties || []);
    const [searchTerm, setSearchTerm] = useState("");
    const [cityFilter, setCityFilter] = useState("");
    const [sizeFilter, setSizeFilter] = useState("");
    const [typeFilter, setTypeFilter] = useState("");

    const cityOptions = React.useMemo(() => {
        const cities = Array.from(new Set((allProperties || []).map(p => p.city).filter(Boolean)));
        return cities.sort();
    }, [allProperties]);

    const sizeOptions = React.useMemo(() => {
        const sizes = Array.from(new Set((allProperties || []).map(p => p.size).filter(Boolean)));
        return sizes.sort();
    }, [allProperties]);

    const typeOptions = React.useMemo(() => {
        const types = Array.from(new Set((allProperties || []).map(p => p.propertyType).filter(Boolean)));
        return types.sort();
    }, [allProperties]);

    useEffect(() => {
        const term = (searchTerm || "").trim().toLowerCase();
        const city = (cityFilter || "").trim().toLowerCase();
        const size = (sizeFilter || "").trim().toLowerCase();
        const type = (typeFilter || "").trim().toLowerCase();

        let list = allProperties || [];

        if (term) {
            list = list.filter((property) => {
                const title = property.title || '';
                const cityField = property.city || '';
                const propertyType = property.propertyType || '';
                const area = property.area || '';
                const price = property.pricePerMonth != null ? String(property.pricePerMonth) : '';
                const rating = property.rating != null ? String(property.rating) : '';
                const description = property.description || '';
                const size = property.size != null ? String(property.size) : '';

                return [title, cityField, propertyType, area, price, rating, description, size].some(field =>
                    field.toLowerCase().includes(term)
                );
            });
        }

        if (city) {
            list = list.filter(p => (p.city || '').toLowerCase() === city);
        }

        if (size) {
            list = list.filter(p => (p.size || '').toLowerCase() === size);
        }

        if (type) {
            list = list.filter(p => (p.propertyType || '').toLowerCase() === type);
        }

        setVisibleProperties(list);
    }, [searchTerm, cityFilter, sizeFilter, typeFilter]);

    return (
        <div>
            <Input
                placeholder="Search For Properties"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 8, flexWrap: 'wrap' }}>
                <select value={cityFilter} onChange={(e) => setCityFilter(e.target.value)}>
                    <option value="">All Cities</option>
                    {cityOptions.map((c) => (
                        <option key={c} value={c}>{c}</option>
                    ))}
                </select>

                <select value={sizeFilter} onChange={(e) => setSizeFilter(e.target.value)}>
                    <option value="">All Sizes</option>
                    {sizeOptions.map((s) => (
                        <option key={s} value={s}>{s}</option>
                    ))}
                </select>

                <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
                    <option value="">All Types</option>
                    {typeOptions.map((t) => (
                        <option key={t} value={t}>{t}</option>
                    ))}
                </select>
            </div>

            <div className="properties-container">
                {visibleProperties.length === 0 ? (
                    <div>No properties found.</div>
                ) : (
                    visibleProperties.map((propertyObj) => {
                        const { id, title, city, description, propertyType, size, rating, pricePerMonth, photos } = propertyObj;
                        return (
                            <PropertyCard
                                key={id}
                                id={id}
                                title={title}
                                city={city}
                                description={description}
                                propertyType={propertyType}
                                size={size}
                                rating={rating}
                                pricePerMonth={pricePerMonth}
                                photos={photos}
                            />
                        );
                    })
                )}
            </div>
        </div>
    );
}

export default Properties;
