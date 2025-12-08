'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    // --- load airplane modelNumber -> id map (DB-agnostic using QueryTypes.SELECT)
    const airplaneRows = await queryInterface.sequelize.query(
      'SELECT id, modelNumber FROM Airplanes;',
      { type: Sequelize.QueryTypes.SELECT }
    );
    const airplaneMap = {};
    airplaneRows.forEach(r => { airplaneMap[r.modelNumber] = r.id; });
    console.log('Loaded airplane models:', Object.keys(airplaneMap).length);

    // --- load existing airport codes set ---
    const airportRows = await queryInterface.sequelize.query(
      'SELECT code FROM Airports;',
      { type: Sequelize.QueryTypes.SELECT }
    );
    const airportSet = new Set(airportRows.map(r => r.code));
    console.log('Loaded airport codes:', airportSet.size);

    // helper to create dates relative to now (offset minutes)
    const makeTime = (minutesFromNow) => new Date(Date.now() + minutesFromNow * 60 * 1000);

    // Flights to insert
    const flightsToInsert = [
      { flightNumber: 'AI-101', airplaneModel: 'A320-200', departure: 'DEL', arrival: 'BOM', depOffset: 60, arrOffset: 60+120, price: 4500, boardingGate: 'A1', totalSeat: 180 },
      { flightNumber: 'AI-102', airplaneModel: 'A320-200', departure: 'BOM', arrival: 'DEL', depOffset: 4*60, arrOffset: 4*60+120, price: 4700, boardingGate: 'B2', totalSeat: 180 },
      { flightNumber: '6E-201', airplaneModel: 'B737-800', departure: 'BLR', arrival: 'HYD', depOffset: 6*60, arrOffset: 6*60+65, price: 3200, boardingGate: 'C3', totalSeat: 189 },
      { flightNumber: '6E-202', airplaneModel: 'B737-800', departure: 'HYD', arrival: 'BLR', depOffset: 8*60, arrOffset: 8*60+70, price: 3300, boardingGate: 'C4', totalSeat: 189 },
      { flightNumber: 'SG-301', airplaneModel: 'ATR-72-600', departure: 'GOI', arrival: 'MAA', depOffset: 10*60, arrOffset: 10*60+75, price: 2400, boardingGate: 'D1', totalSeat: 70 },
      { flightNumber: 'IN-401', airplaneModel: 'Embraer E190', departure: 'CJB', arrival: 'CCU', depOffset: 12*60, arrOffset: 12*60+100, price: 3500, boardingGate: 'E2', totalSeat: 100 },
      { flightNumber: 'IN-402', airplaneModel: 'Bombardier Q400', departure: 'CCU', arrival: 'CJB', depOffset: 16*60, arrOffset: 16*60+100, price: 3000, boardingGate: 'E3', totalSeat: 78 },
      { flightNumber: 'AI-9001', airplaneModel: 'B787-9 Dreamliner', departure: 'DEL', arrival: 'LHR', depOffset: 24*60, arrOffset: 24*60 + (8*60 + 30), price: 42000, boardingGate: 'G5', totalSeat: 296 },
      { flightNumber: 'BA-100', airplaneModel: 'A380-800', departure: 'LHR', arrival: 'JFK', depOffset: 48*60, arrOffset: 48*60 + (8*60), price: 75000, boardingGate: 'H1', totalSeat: 555 },
      { flightNumber: 'DL-200', airplaneModel: 'B777-300ER', departure: 'JFK', arrival: 'LAX', depOffset: 72*60, arrOffset: 72*60 + (6*60 + 30), price: 38000, boardingGate: 'H2', totalSeat: 368 },
      { flightNumber: 'SQ-500', airplaneModel: 'A350-900', departure: 'SIN', arrival: 'DEL', depOffset: 96*60, arrOffset: 96*60 + (7*60 + 30), price: 46000, boardingGate: 'I3', totalSeat: 300 },
      { flightNumber: 'EK-800', airplaneModel: 'A380-800', departure: 'DXB', arrival: 'DEL', depOffset: 120*60, arrOffset: 120*60 + (5*60 + 30), price: 28000, boardingGate: 'J4', totalSeat: 555 },
      { flightNumber: 'QF-600', airplaneModel: 'B787-9 Dreamliner', departure: 'SYD', arrival: 'MEL', depOffset: 140*60, arrOffset: 140*60 + (1*60 + 45), price: 22000, boardingGate: 'K1', totalSeat: 296 },
      { flightNumber: 'AI-550', airplaneModel: 'B747-8', departure: 'DEL', arrival: 'COK', depOffset: 150*60, arrOffset: 150*60 + (3*60 + 15), price: 12500, boardingGate: 'L2', totalSeat: 410 },
      { flightNumber: 'IN-701', airplaneModel: 'A320-200', departure: 'PNQ', arrival: 'HYD', depOffset: 160*60, arrOffset: 160*60 + (1*60 + 30), price: 4200, boardingGate: 'M3', totalSeat: 180 },
      { flightNumber: 'IN-702', airplaneModel: 'A320-200', departure: 'HYD', arrival: 'PNQ', depOffset: 164*60, arrOffset: 164*60 + (1*60 + 30), price: 4300, boardingGate: 'M4', totalSeat: 180 },
      { flightNumber: 'RG-810', airplaneModel: 'Embraer E190', departure: 'BLR', arrival: 'CJB', depOffset: 170*60, arrOffset: 170*60 + (1*60 + 40), price: 3100, boardingGate: 'N5', totalSeat: 100 },
      { flightNumber: 'TP-901', airplaneModel: 'Bombardier Q400', departure: 'COK', arrival: 'TRV', depOffset: 180*60, arrOffset: 180*60 + 65, price: 2700, boardingGate: 'O6', totalSeat: 78 },
      { flightNumber: 'IN-810', airplaneModel: 'A350-900', departure: 'VTZ', arrival: 'BLR', depOffset: 190*60, arrOffset: 190*60 + (1*60 + 40), price: 5500, boardingGate: 'P1', totalSeat: 300 },
      { flightNumber: 'IN-811', airplaneModel: 'A320-200', departure: 'BDQ', arrival: 'RAJ', depOffset: 200*60, arrOffset: 200*60 + (1*60 + 10), price: 3800, boardingGate: 'P2', totalSeat: 180 }
    ];

    // Insert one-by-one to capture exact errors per-row
    const inserted = [];
    const skipped = [];
    for (const f of flightsToInsert) {
      // validate airplane
      const airplaneId = airplaneMap[f.airplaneModel];
      if (!airplaneId) {
        skipped.push({ flightNumber: f.flightNumber, reason: `Airplane model not found: ${f.airplaneModel}` });
        console.warn(`Skipping ${f.flightNumber}: airplane model missing (${f.airplaneModel})`);
        continue;
      }

      // validate airports
      if (!airportSet.has(f.departure) || !airportSet.has(f.arrival)) {
        const missing = !airportSet.has(f.departure) ? f.departure : f.arrival;
        skipped.push({ flightNumber: f.flightNumber, reason: `Missing airport code: ${missing}` });
        console.warn(`Skipping ${f.flightNumber}: missing airport code ${missing}`);
        continue;
      }

      const row = {
        flightNumber: f.flightNumber,
        airplaneId,
        departureAirportId: f.departure,
        arrivalAirportId: f.arrival,
        arrivaTime: makeTime(f.arrOffset),
        departureTime: makeTime(f.depOffset),
        price: f.price,
        boardingGate: f.boardingGate,
        totalSeat: f.totalSeat,
        createdAt: now,
        updatedAt: now
      };

      try {
        await queryInterface.bulkInsert('Flights', [row], {});
        inserted.push(f.flightNumber);
        console.log(`Inserted flight ${f.flightNumber}`);
      } catch (err) {
        // Log detailed info so we can see exactly why this row failed
        console.error(`Failed to insert flight ${f.flightNumber}:`, err.message);
        if (Array.isArray(err.errors)) {
          console.error('Validation errors:');
          err.errors.forEach((e, i) => console.error(`#${i+1} field=${e.path} message=${e.message} value=${JSON.stringify(e.value)}`));
        }
        if (err.parent) {
          console.error('DB error detail:', err.parent.sqlMessage || err.parent.message || err.parent);
        }
        skipped.push({ flightNumber: f.flightNumber, reason: err.message });
        // continue with next flight
      }
    }

    console.log(`Flights seeder finished. Inserted: ${inserted.length}. Skipped: ${skipped.length}`);
    if (skipped.length) console.log('Skipped details:', skipped);
  },

  async down(queryInterface, Sequelize) {
    const flightNumbers = [
      'AI-101','AI-102','6E-201','6E-202','SG-301','IN-401','IN-402',
      'AI-9001','BA-100','DL-200','SQ-500','EK-800','QF-600','AI-550',
      'IN-701','IN-702','RG-810','TP-901','IN-810','IN-811'
    ];
    await queryInterface.bulkDelete('Flights', { flightNumber: flightNumbers }, {});
  }
};
