import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { properties } from '../data.jsx';
import './PropertyDetail.css';
import DefaultImage from '../../assets/1.jpg';
import { Check, Plane, Hospital, School, ShoppingCart, Train, MapPin, Droplet, Dumbbell, Car, Zap, Thermometer, Heart } from 'lucide-react';
function PropertyDetail(){
    const { id } = useParams();
    const [property, setProperty] = useState(null);
    const [name, setName] = useState('');
    const [ratingInput, setRatingInput] = useState(5);
    const [commentInput, setCommentInput] = useState('');

    useEffect(() => {
        const found = properties.find((prop) => prop.id === id);
        setProperty(found || null);
    }, [id]);

    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

    useEffect(() => {
        setCurrentPhotoIndex(0);
    }, [property]);

    if (!property) {
        return <div className="property-detail">Property not found or loading...</div>;
    }

    const imageSrc = (property.photos && property.photos.length > 0) ? property.photos[currentPhotoIndex] : DefaultImage;

    return (
        <div className="property-detail">
            <img src={imageSrc} alt="property" className="property-img"/>
            <div className="photo-thumbs">
                {(property.photos || []).map((photo, idx) => (
                    <img
                        key={idx}
                        src={photo}
                        alt={`thumb-${idx+1}`}
                        className={`property-details-small-img ${idx === currentPhotoIndex ? 'active' : ''}`}
                        onClick={() => setCurrentPhotoIndex(idx)}
                    />
                ))}
            </div>
            <h1>{property.title}</h1>
            <p><strong>Address:</strong> {property.description}</p>
            <div className="details-grid">
                <div className="detail-box">
                    <div className="label">ID</div>
                    <div className="value">{property.id || '—'}</div>
                </div>
                <div className="detail-box">
                    <div className="label">City</div>
                    <div className="value">{property.city || '—'}</div>
                </div>
                <div className="detail-box">
                    <div className="label">Type</div>
                    <div className="value">{property.propertyType || '—'}</div>
                </div>
                <div className="detail-box">
                    <div className="label">Size</div>
                    <div className="value">{property.size || '—'}</div>
                </div>
                <div className="detail-box">
                    <div className="label">Price</div>
                    <div className="value">{property.pricePerMonth ? `₹${property.pricePerMonth.toLocaleString()}` : '—'}</div>
                </div>
                <div className="detail-box">
                    <div className="label">Rating</div>
                    <div className="value">{property.rating ?? '—'}</div>
                </div>
                <div className="detail-box">
                    <div className="label">Listed At</div>
                    <div className="value">{property.listedAt ? new Date(property.listedAt).toLocaleDateString() : '—'}</div>
                </div>
            </div>
            <section className="property-extra">
                
                <h2>Amenities</h2>
                <div className="amenities-list">
                    {(() => {
                        const AMENITY_ICON_MAP = {
                            'swimming pool': Droplet,
                            'lift': Check,
                            'gym': Dumbbell,
                            'parking': Car,
                            'garden': MapPin,
                            'power backup': Zap,
                            'air conditioning': Thermometer,
                            'pet friendly': Heart,
                            'playground': MapPin,
                            '24x7 security': Hospital
                        };

                        return (property.amenities || []).map((a) => {
                            const key = (a || '').toLowerCase();
                            const Icon = AMENITY_ICON_MAP[key] || Check;
                            return (
                                <div className="amenity" key={a}>
                                    <span className="amenity-icon"><Icon size={16} /></span>
                                    <span>{a}</span>
                                </div>
                            );
                        });
                    })()}
                    {(property.amenities || []).length === 0 && <span>—</span>}
                </div>

                <h2>Nearby</h2>
                <div className="nearby-grid">
                    {property.nearby && Object.entries(property.nearby).map(([k, v]) => {
                        const ICON_MAP = {
                            hospital: Hospital,
                            school: School,
                            airport: Plane,
                            mall: ShoppingCart,
                            railwayStation: Train,
                            metroStation: MapPin
                        };
                        const Icon = ICON_MAP[k] || MapPin;
                        return (
                        <div className="nearby-card" key={k}>
                            <div className="nearby-icon"><Icon size={18} /></div>
                            <div>
                                <div className="nearby-name">{v.name}</div>
                                <div className="nearby-distance">{v.distanceKm} km</div>
                            </div>
                        </div>
                    )})}
                </div>

                <h2>Reviews</h2>
                {property.reviewers && property.reviewers.length > 0 ? (
                    property.reviewers.map((r) => (
                        <div key={r.id} className="reviewer-card">
                            <div className="reviewer-card-avatar">{r.name?.charAt(0).toUpperCase()}</div>
                            <div className="reviewer-card-body">
                                <div className="reviewer-card-header">
                                    <strong>{r.name}</strong>
                                    <span className="reviewer-rating">⭐ {r.rating}</span>
                                </div>
                                <div className="reviewer-date">{new Date(r.date).toLocaleDateString()}</div>
                                <p className="reviewer-comment">{r.comment}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    // show a couple of placeholder sample comments when there are no real reviews
                    [
                        { id: 'sample-1', name: 'Alice', rating: 4.5, date: new Date().toISOString(), comment: 'Nice property and helpful host.' },
                        { id: 'sample-2', name: 'Bob', rating: 4.0, date: new Date().toISOString(), comment: 'Good location and value.' }
                    ].map((r) => (
                        <div key={r.id} className="reviewer-card">
                            <div className="reviewer-card-avatar">{r.name.charAt(0).toUpperCase()}</div>
                            <div className="reviewer-card-body">
                                <div className="reviewer-card-header">
                                    <strong>{r.name}</strong>
                                    <span className="reviewer-rating">⭐ {r.rating}</span>
                                </div>
                                <div className="reviewer-date">{new Date(r.date).toLocaleDateString()}</div>
                                <p className="reviewer-comment">{r.comment}</p>
                            </div>
                        </div>
                    ))
                )}
                <div className="add-review">
                    <h3>Add a review</h3>
                    <input placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
                    <select value={ratingInput} onChange={(e) => setRatingInput(Number(e.target.value))}>
                        {[5,4,3,2,1].map(v => <option key={v} value={v}>{v} ★</option>)}
                    </select>
                    <textarea placeholder="Your comment" value={commentInput} onChange={(e) => setCommentInput(e.target.value)} />
                    <button onClick={() => {
                        if(!name || !commentInput) return alert('Please provide name and comment');
                        const newReview = { id: `${property.id}-rev-${Date.now()}`, name, rating: ratingInput, comment: commentInput, date: new Date().toISOString() };
                        // mutate in-memory dataset for now
                        property.reviewers = property.reviewers ? [newReview, ...property.reviewers] : [newReview];
                        setProperty({ ...property });
                        setName(''); setCommentInput(''); setRatingInput(5);
                    }}>Submit</button>
                </div>
                
                <section className="owner-contact">
                    <h2>Owner Contact</h2>
                    <p><strong>Name:</strong> {property.owner?.name || '—'}</p>
                    <p><strong>Phone:</strong> {property.owner?.phone ? <a className="owner-link" href={`tel:${property.owner.phone}`}>{property.owner.phone}</a> : '—'}</p>
                    <p><strong>Email:</strong> {property.owner?.email ? <a className="owner-link" href={`mailto:${property.owner.email}`}>{property.owner.email}</a> : '—'}</p>
                </section>
            </section>
        </div>
    );
}

export default PropertyDetail;
