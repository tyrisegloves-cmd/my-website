import { useState, useMemo } from 'react';
import { Search, Clock, MapPin, Calendar } from 'lucide-react';
import { useStore } from '../store';
import { mockServices, serviceCategories } from '../data/mockData';
import { PageHeader } from './PageHeader';

interface ServicesPageProps {
  onBack?: () => void;
}

export function ServicesPage({ onBack }: ServicesPageProps) {
  const [localSearch, setLocalSearch] = useState('');
  const [localCategory, setLocalCategory] = useState('all');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<any>(null);
  const { addBooking } = useStore();

  const filteredServices = useMemo(() => {
    let services = mockServices;

    if (localSearch) {
      services = services.filter(s =>
        s.name.toLowerCase().includes(localSearch.toLowerCase()) ||
        s.description.toLowerCase().includes(localSearch.toLowerCase())
      );
    }

    if (localCategory !== 'all') {
      services = services.filter(s => s.category === localCategory);
    }

    return services;
  }, [localSearch, localCategory]);

  const handleBookService = (service: any) => {
    setSelectedService(service);
    setBookingModalOpen(true);
  };

  const confirmBooking = () => {
    if (selectedDate && selectedTime && selectedService) {
      addBooking({
        id: `booking-${Date.now()}`,
        serviceId: selectedService.id,
        serviceName: selectedService.name,
        date: selectedDate,
        time: selectedTime,
        status: 'pending'
      });
      setBookingModalOpen(false);
      setSelectedDate('');
      setSelectedTime('');
      setSelectedService(null);
      alert('Booking confirmed! You will receive a confirmation email shortly.');
    }
  };

  const timeSlots = ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0a0e1a]">
      <PageHeader
        title="Professional Tech Services"
        subtitle="Book expert technicians for repair, installation, and optimization services."
        gradient="from-blue-500 via-blue-600 to-blue-700"
        onBack={onBack}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Search
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder="Search services..."
                    value={localSearch}
                    onChange={(e) => setLocalSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Service Type
                </label>
                <div className="space-y-2">
                  {serviceCategories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setLocalCategory(cat)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        localCategory === cat
                          ? 'bg-green-100 text-green-700 font-medium'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Services Grid */}
          <div className="lg:col-span-3">
            {filteredServices.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No services found matching your criteria.</p>
              </div>
            ) : (
              <>
                <div className="mb-4 text-sm text-gray-600">
                  Showing {filteredServices.length} services
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredServices.map((service) => (
                    <div
                      key={service.id}
                      className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300"
                    >
                      {/* Header */}
                      <div className="h-40 bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center">
                        <div className="text-6xl">{service.image}</div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {service.name}
                        </h3>

                        <p className="text-sm text-gray-600 mb-4">
                          {service.description}
                        </p>

                        {/* Service Details */}
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Clock size={16} className="text-green-600" />
                            <span>{service.duration}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <MapPin size={16} className="text-green-600" />
                            <span>On-site & Remote</span>
                          </div>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center gap-1 mb-4">
                          <div className="flex text-yellow-400">
                            {'★'.repeat(Math.floor(service.rating))}
                          </div>
                          <span className="text-sm text-gray-600">
                            {service.rating} ({service.reviews} reviews)
                          </span>
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                          <div className="text-lg font-bold text-gray-900">
                            ${service.price.toFixed(2)}
                          </div>
                          <button
                            onClick={() => handleBookService(service)}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium flex items-center gap-2"
                          >
                            <Calendar size={16} />
                            Book Now
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {bookingModalOpen && selectedService && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Space Grotesk' }}>
                Book {selectedService.name}
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Time
                  </label>
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Select a time slot</option>
                    {timeSlots.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Service Price:</span>
                    <span className="text-lg font-bold text-green-600">
                      ${selectedService.price.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => {
                    setBookingModalOpen(false);
                    setSelectedDate('');
                    setSelectedTime('');
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmBooking}
                  disabled={!selectedDate || !selectedTime}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Confirm Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
