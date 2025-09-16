'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    // Get all cities using Sequelize query (database agnostic)
    const cities = await queryInterface.sequelize.query(
      'SELECT id, name FROM Cities',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );
    
    const cityMap = new Map();
    cities.forEach(city => cityMap.set(city.name, city.id));

    const airportData = [
      // 🇮🇳 Airports in Indian Cities
      { name: 'Indira Gandhi International Airport', code: 'DEL', address: 'New Delhi, Delhi', cityName: 'Delhi' },
      { name: 'Safdarjung Airport (Delhi)', code: 'VIDX', address: 'Safdarjung Airport Area, New Delhi, Delhi', cityName: 'Delhi' },
      { name: 'Chhatrapati Shivaji Maharaj International Airport', code: 'BOM', address: 'Mumbai, Maharashtra', cityName: 'Mumbai' },
      { name: 'Juhu Airport (Mumbai)', code: 'VABJ', address: 'Juhu, Vile Parle, Mumbai, Maharashtra', cityName: 'Mumbai' },
      { name: 'Kempegowda International Airport', code: 'BLR', address: 'Bengaluru, Karnataka', cityName: 'Bengaluru' },
      { name: 'HAL Airport (Bengaluru)', code: 'VOBG', address: 'Bengaluru, Karnataka', cityName: 'Bengaluru' },
      { name: 'Rajiv Gandhi International Airport', code: 'HYD', address: 'Hyderabad, Telangana', cityName: 'Hyderabad' },
      { name: 'Begumpet Airport (Hyderabad)', code: 'VOHY', address: 'Begumpet, Hyderabad, Telangana', cityName: 'Hyderabad' },
      { name: 'Chennai International Airport', code: 'MAA', address: 'Chennai, Tamil Nadu', cityName: 'Chennai' },
      { name: 'Netaji Subhas Chandra Bose International Airport', code: 'CCU', address: 'Kolkata, West Bengal', cityName: 'Kolkata' },
      { name: 'Pune Airport', code: 'PNQ', address: 'Pune, Maharashtra', cityName: 'Pune' },
      { name: 'Sardar Vallabhbhai Patel International Airport', code: 'AMD', address: 'Ahmedabad, Gujarat', cityName: 'Ahmedabad' },
      { name: 'Jaipur International Airport', code: 'JAI', address: 'Jaipur, Rajasthan', cityName: 'Jaipur' },
      { name: 'Chaudhary Charan Singh International Airport', code: 'LKO', address: 'Lucknow, Uttar Pradesh', cityName: 'Lucknow' },
      { name: 'Kanpur Airport', code: 'KNU', address: 'Kanpur, Uttar Pradesh', cityName: 'Kanpur' },
      { name: 'Dr. Babasaheb Ambedkar International Airport', code: 'NAG', address: 'Nagpur, Maharashtra', cityName: 'Nagpur' },
      { name: 'Devi Ahilya Bai Holkar Airport', code: 'IDR', address: 'Indore, Madhya Pradesh', cityName: 'Indore' },
      { name: 'Raja Bhoj Airport', code: 'BHO', address: 'Bhopal, Madhya Pradesh', cityName: 'Bhopal' },
      { name: 'Jay Prakash Narayan Airport', code: 'PAT', address: 'Patna, Bihar', cityName: 'Patna' },
      { name: 'Surat International Airport', code: 'STV', address: 'Surat, Gujarat', cityName: 'Surat' },
      { name: 'Vadodara Airport', code: 'BDQ', address: 'Vadodara, Gujarat', cityName: 'Vadodara' },
      { name: 'Rajkot Airport', code: 'RAJ', address: 'Rajkot, Gujarat', cityName: 'Rajkot' },
      { name: 'Visakhapatnam International Airport', code: 'VTZ', address: 'Visakhapatnam, Andhra Pradesh', cityName: 'Visakhapatnam' },
      { name: 'Vijayawada Airport', code: 'VGA', address: 'Vijayawada, Andhra Pradesh', cityName: 'Vijayawada' },
      { name: 'Chandigarh International Airport', code: 'IXC', address: 'Chandigarh', cityName: 'Chandigarh' },
      { name: 'Sri Guru Ram Dass Jee International Airport', code: 'ATQ', address: 'Amritsar, Punjab', cityName: 'Amritsar' },
      { name: 'Sahnewal Airport', code: 'LUH', address: 'Ludhiana, Punjab', cityName: 'Ludhiana' },
      { name: 'Coimbatore International Airport', code: 'CJB', address: 'Coimbatore, Tamil Nadu', cityName: 'Coimbatore' },
      { name: 'Madurai Airport', code: 'IXM', address: 'Madurai, Tamil Nadu', cityName: 'Madurai' },
      { name: 'Mysuru Airport', code: 'MYQ', address: 'Mysuru, Karnataka', cityName: 'Mysuru' },
      { name: 'Trivandrum International Airport', code: 'TRV', address: 'Thiruvananthapuram, Kerala', cityName: 'Thiruvananthapuram' },
      { name: 'Cochin International Airport', code: 'COK', address: 'Kochi, Kerala', cityName: 'Kochi' },
      { name: 'Lokpriya Gopinath Bordoloi International Airport', code: 'GAU', address: 'Guwahati, Assam', cityName: 'Guwahati' },
      { name: 'Birsa Munda Airport', code: 'IXR', address: 'Ranchi, Jharkhand', cityName: 'Ranchi' },
      { name: 'Lal Bahadur Shastri International Airport', code: 'VNS', address: 'Varanasi, Uttar Pradesh', cityName: 'Varanasi' },

      // 🌍 Airports in Overseas Cities
      { name: 'John F. Kennedy International Airport', code: 'JFK', address: 'Queens, New York, USA', cityName: 'New York' },
      { name: 'LaGuardia Airport', code: 'LGA', address: 'Queens, New York, USA', cityName: 'New York' },
      { name: 'Newark Liberty International Airport', code: 'EWR', address: 'Newark, New Jersey, USA', cityName: 'New York' },
      { name: 'London Heathrow Airport', code: 'LHR', address: 'London, UK', cityName: 'London' },
      { name: 'London Gatwick Airport', code: 'LGW', address: 'London, UK', cityName: 'London' },
      { name: 'London City Airport', code: 'LCY', address: 'London, UK', cityName: 'London' },
      { name: 'Charles de Gaulle Airport', code: 'CDG', address: 'Paris, France', cityName: 'Paris' },
      { name: 'Orly Airport', code: 'ORY', address: 'Paris, France', cityName: 'Paris' },
      { name: 'Narita International Airport', code: 'NRT', address: 'Tokyo, Japan', cityName: 'Tokyo' },
      { name: 'Haneda Airport', code: 'HND', address: 'Tokyo, Japan', cityName: 'Tokyo' },
      { name: 'Singapore Changi Airport', code: 'SIN', address: 'Singapore', cityName: 'Singapore' },
      { name: 'Dubai International Airport', code: 'DXB', address: 'Dubai, UAE', cityName: 'Dubai' },
      { name: 'Al Maktoum International Airport (Dubai)', code: 'DWC', address: 'Jebel Ali, Dubai, UAE', cityName: 'Dubai' },
      { name: 'Toronto Pearson International Airport', code: 'YYZ', address: 'Toronto, Canada', cityName: 'Toronto' },
      { name: 'Billy Bishop Toronto City Airport', code: 'YTZ', address: 'Toronto, Canada', cityName: 'Toronto' },
      { name: 'Los Angeles International Airport', code: 'LAX', address: 'Los Angeles, California, USA', cityName: 'Los Angeles' },
      { name: 'Chicago O\'Hare International Airport', code: 'ORD', address: 'Chicago, Illinois, USA', cityName: 'Chicago' },
      { name: 'Midway International Airport', code: 'MDW', address: 'Chicago, Illinois, USA', cityName: 'Chicago' },
      { name: 'Sydney Kingsford Smith Airport', code: 'SYD', address: 'Sydney, Australia', cityName: 'Sydney' },
      { name: 'Melbourne Airport', code: 'MEL', address: 'Melbourne, Australia', cityName: 'Melbourne' },
      { name: 'Essendon Fields Airport (Melbourne)', code: 'MEB', address: 'Melbourne, Australia', cityName: 'Melbourne' },
      { name: 'Berlin Brandenburg Airport', code: 'BER', address: 'Berlin, Germany', cityName: 'Berlin' },
      { name: 'Leonardo da Vinci-Fiumicino Airport', code: 'FCO', address: 'Rome, Italy', cityName: 'Rome' },
      { name: 'Hong Kong International Airport', code: 'HKG', address: 'Hong Kong', cityName: 'Hong Kong' },
      { name: 'Suvarnabhumi Airport', code: 'BKK', address: 'Bangkok, Thailand', cityName: 'Bangkok' },
      { name: 'Don Mueang International Airport', code: 'DMK', address: 'Bangkok, Thailand', cityName: 'Bangkok' },
    ];

    // Filter out airports where cities don't exist and log missing ones
    const validAirports = [];
    const missingCities = [];

    for (const airport of airportData) {
      const cityId = cityMap.get(airport.cityName);
      if (cityId) {
        validAirports.push({
          name: airport.name,
          code: airport.code,
          address: airport.address,
          cityId: cityId,
          createdAt: now,
          updatedAt: now
        });
      } else {
        missingCities.push(airport.cityName);
      }
    }

    // Log missing cities for debugging
    if (missingCities.length > 0) {
      console.log('Warning: The following cities were not found and their airports will be skipped:');
      console.log([...new Set(missingCities)].join(', '));
    }

    // Only insert airports for existing cities
    if (validAirports.length > 0) {
      await queryInterface.bulkInsert('Airports', validAirports, {});
      console.log(`Successfully inserted ${validAirports.length} airports`);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Airports', null, {});
  }
};