import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {
  BookOpenIcon,
  UserGroupIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import { Link } from "react-router-dom";


const HomePage = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    fetch(`https://api.pexels.com/v1/search?query=library&per_page=6`, {
      headers: {
        Authorization: 'Ywfa7QJFVHvm86ilUWbd4IUDSSDio4tWwP7pETTuyzX54QZOZ5xic6kA' 
      }
    })
      .then((res) => res.json())
      .then((data) =>
        setImages(data.photos.map((img) => img.src.medium))
      )
      .catch((err) => console.error('Image fetch error:', err));
  }, []);

  return (
    <div className="flex flex-col min-h-screen font-sans bg-white">
      <main className="flex-grow">

        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-800 to-indigo-900 text-white text-center py-24 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg')] bg-cover bg-center opacity-20 blur-sm"></div>
          <div className="relative z-10">
            <h1 className="text-5xl md:text-6xl font-extrabold mb-4 animate-bounce">
              Welcome to OLMS
            </h1>
            <p className="text-xl mb-8 max-w-xl mx-auto">
              Your all-in-one Online Library Management System – manage books, track borrowing, and more!
            </p>
            <Link
              to="/register"
              className="bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-blue-100 transition-all duration-300 shadow-lg animate-pulse"
            >
           
              Get Started
            </Link>
          </div>
        </section>

        {/* About Section */}
        <section className="py-20 px-6 bg-gray-100">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div data-aos="fade-right">
              <h2 className="text-4xl font-bold mb-6 text-blue-800">About OLMS</h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                OLMS (Online Library Management System) is designed to streamline the process of managing a digital library.
                Whether you're issuing books, maintaining history, or managing user records, OLMS simplifies your task. <br /><br />
                It’s built for speed, convenience, and accessibility, ensuring students and administrators can enjoy a seamless library experience.
              </p>
            </div>
            <div data-aos="fade-left">
              <img
                src="https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg"
                alt="About OLMS"
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>
          </div>
        </section>

        {/* Image Gallery Section */}
        <section className="py-16 px-6 bg-white">
          <h2 className="text-4xl font-semibold text-center mb-10 text-blue-900">Library Moments</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {images.map((url, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-xl shadow-md transform hover:scale-105 hover:shadow-xl transition duration-500"
                data-aos="zoom-in"
              >
                <img src={url} alt={`library-${index}`} className="w-full h-64 object-cover" />
              </div>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-6 bg-gray-50">
          <h2 className="text-4xl font-semibold text-center mb-12 text-blue-800">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            <div
              className="p-6 shadow-lg rounded bg-white hover:bg-blue-50 hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              data-aos="fade-up"
            >
              <BookOpenIcon className="h-12 w-12 mx-auto text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-2 text-blue-800">Book Issuing</h3>
              <p className="text-gray-600">Issue and return books online quickly with real-time updates.</p>
            </div>
            <div
              className="p-6 shadow-lg rounded bg-white hover:bg-blue-50 hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <UserGroupIcon className="h-12 w-12 mx-auto text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-2 text-blue-800">User Management</h3>
              <p className="text-gray-600">Register, login, and manage profiles effortlessly and securely.</p>
            </div>
            <div
              className="p-6 shadow-lg rounded bg-white hover:bg-blue-50 hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <ClockIcon className="h-12 w-12 mx-auto text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-2 text-blue-800">Track History</h3>
              <p className="text-gray-600">Easily view your borrowing and return history anytime.</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;

// 