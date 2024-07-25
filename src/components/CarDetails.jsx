import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function CarDetails() {
    const { id } = useParams();
    const [car, setCar] = React.useState(null);

    React.useEffect(() => {
        const fetchCar = async () => {
            try {
                const response = await axios.get(`https://auto-lease-backend.onrender.com/api/v1/cars/${id}`);
                setCar(response.data.data.car);
            } catch (error) {
                console.error("Error fetching car details:", error);
            }
        };
        fetchCar();
    }, [id]);

    if (!car) return <div>Loading...</div>;

    return (
        <div className="p-4">
            <img src={car.image} alt={car.slug} />
            <h1 className="text-3xl font-bold">{car.name}</h1>
            <p>Model: {car.model}</p>
            <p>Category: {car.category}</p>
            <p>Price: ₦{car.price}</p>
            <p>Fee: ₦{car.fee}</p>
            <p>Discount: {car.discount}%</p>
            <p>{car.summary}</p>

            <img src={car.coverImage.url} alt={car.name} className="w-full h-48 object-cover rounded" />
            <h3 className="text-xl font-bold">{car.name}</h3>
            <p className="text-gray-700">Model: {car.model}</p>
            <p className="text-gray-700">Category: {car.category}</p>
            <p className="text-autoPurple font-bold">₦{car.price}</p>
            <p className="text-sm text-gray-600">Rating: {car.ratingsAverage} ({car.ratingsQuantity} reviews)</p>
            <p className="text-sm text-gray-600">{car.summary}</p>

            {/* Add any additional details or actions here */}
        </div>
    );
}

export default CarDetails;