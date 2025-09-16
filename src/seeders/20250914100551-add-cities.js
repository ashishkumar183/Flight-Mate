'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    try {
      // Check if Cities table exists and its structure
      const tableDesc = await queryInterface.describeTable('Cities');
      console.log('Cities table structure:', tableDesc);

      const cities = [
        // 🇮🇳 Indian Cities 
        { name: 'Delhi', createdAt: now, updatedAt: now },
        { name: 'Mumbai', createdAt: now, updatedAt: now },
        { name: 'Bengaluru', createdAt: now, updatedAt: now },
        { name: 'Hyderabad', createdAt: now, updatedAt: now },
        { name: 'Chennai', createdAt: now, updatedAt: now },
        { name: 'Kolkata', createdAt: now, updatedAt: now },
        { name: 'Pune', createdAt: now, updatedAt: now },
        { name: 'Ahmedabad', createdAt: now, updatedAt: now },
        { name: 'Jaipur', createdAt: now, updatedAt: now },
        { name: 'Lucknow', createdAt: now, updatedAt: now },
        { name: 'Kanpur', createdAt: now, updatedAt: now },
        { name: 'Nagpur', createdAt: now, updatedAt: now },
        { name: 'Indore', createdAt: now, updatedAt: now },
        { name: 'Bhopal', createdAt: now, updatedAt: now },
        { name: 'Patna', createdAt: now, updatedAt: now },
        { name: 'Surat', createdAt: now, updatedAt: now },
        { name: 'Vadodara', createdAt: now, updatedAt: now },
        { name: 'Rajkot', createdAt: now, updatedAt: now },
        { name: 'Visakhapatnam', createdAt: now, updatedAt: now },
        { name: 'Vijayawada', createdAt: now, updatedAt: now },
        { name: 'Chandigarh', createdAt: now, updatedAt: now },
        { name: 'Amritsar', createdAt: now, updatedAt: now },
        { name: 'Ludhiana', createdAt: now, updatedAt: now },
        { name: 'Coimbatore', createdAt: now, updatedAt: now },
        { name: 'Madurai', createdAt: now, updatedAt: now },
        { name: 'Mysuru', createdAt: now, updatedAt: now },
        { name: 'Thiruvananthapuram', createdAt: now, updatedAt: now },
        { name: 'Kochi', createdAt: now, updatedAt: now },
        { name: 'Guwahati', createdAt: now, updatedAt: now },
        { name: 'Ranchi', createdAt: now, updatedAt: now },
        { name: 'Varanasi', createdAt: now, updatedAt: now },

        // 🌍 Overseas Cities 
        { name: 'New York', createdAt: now, updatedAt: now },
        { name: 'London', createdAt: now, updatedAt: now },
        { name: 'Paris', createdAt: now, updatedAt: now },
        { name: 'Tokyo', createdAt: now, updatedAt: now },
        { name: 'Singapore', createdAt: now, updatedAt: now },
        { name: 'Dubai', createdAt: now, updatedAt: now },
        { name: 'Toronto', createdAt: now, updatedAt: now },
        { name: 'Los Angeles', createdAt: now, updatedAt: now },
        { name: 'Chicago', createdAt: now, updatedAt: now },
        { name: 'Sydney', createdAt: now, updatedAt: now },
        { name: 'Melbourne', createdAt: now, updatedAt: now },
        { name: 'Berlin', createdAt: now, updatedAt: now },
        { name: 'Rome', createdAt: now, updatedAt: now },
        { name: 'Hong Kong', createdAt: now, updatedAt: now },
        { name: 'Bangkok', createdAt: now, updatedAt: now },
      ];

      console.log('Sample city data:', cities[0]);
      console.log('Total cities to insert:', cities.length);

      // Try to insert cities with better error handling
      await queryInterface.bulkInsert('Cities', cities, { 
        ignoreDuplicates: true 
      });

      console.log('Cities seeded successfully');

    } catch (error) {
      console.error('Detailed error information:');
      console.error('Error message:', error.message);
      console.error('Error name:', error.name);
      
      if (error.errors) {
        console.error('Validation errors:', error.errors.map(e => ({
          field: e.path,
          message: e.message,
          value: e.value
        })));
      }
      
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Cities', {
      name: [
        'Delhi','Mumbai','Bengaluru','Hyderabad','Chennai','Kolkata','Pune','Ahmedabad',
        'Jaipur','Lucknow','Kanpur','Nagpur','Indore','Bhopal','Patna','Surat','Vadodara',
        'Rajkot','Visakhapatnam','Vijayawada','Chandigarh','Amritsar','Ludhiana','Coimbatore',
        'Madurai','Mysuru','Thiruvananthapuram','Kochi','Guwahati','Ranchi','Varanasi',
        'New York','London','Paris','Tokyo','Singapore','Dubai','Toronto','Los Angeles',
        'Chicago','Sydney','Melbourne','Berlin','Rome','Hong Kong','Bangkok'
      ]
    }, {});
  }
};