describe('Backend Integration Test', () => {
    let accessToken = '';
    let clientData = {
        username: "newclient5",
        email: "newclient5@otenet.gr",
        password: "Password5$",
        firstname: "Νέος",
        lastname: "Πελάτης",
        tel: "6991919191"
    };

    let staffData = {
        s_email: "newstaff2@hoteldmd.gr",
        s_password: "Staffpas2#",
        s_firstname: "Φίλιπ",
        s_lastname: "Τζούρισιτς",
        s_tel: "6911111119",
        salary: "2000",
        job_descr: "Reception",
        date_of_joining: "2025-1-26"
    };

    let loginData = {
        username: clientData.username,
        password: clientData.password
    };

    let availabilityData = {};
    let bookingData = {};
    let paymentData = {};
    let messageData = {
        m_email: "newclient5@otenet.gr",
        m_firstname: "Νέος",
        m_lastname: "Πελάτης",
        m_tel: "6991919191",
        message: "I have a question about my booking."
    };

    it('1. Δημιουργία Πελάτη', () => {
        cy.request({
            method: 'POST',
            url: 'http://localhost:8000/clients/',
            body: clientData
        }).then(response => {
            expect(response.status).to.eq(201);
            expect(response.body).to.have.property('id');
            const clientId = response.body.id;
        });
    });

    it('2. Δημιουργία Υπαλλήλου', () => {
        cy.request({
            method: 'POST',
            url: 'http://localhost:8000/staff/',
            body: staffData
        }).then(response => {
            expect(response.status).to.eq(201);
            expect(response.body).to.have.property('s_id');
            const staffId = response.body.id;
        });
    });

    it('3. Login Πελάτη', () => {
        cy.request({
            method: 'POST',
            url: 'http://localhost:8000/client/login/',
            body: loginData
        }).then(response => {
            expect(response.status).to.eq(200);
            accessToken = response.body.access;
            expect(accessToken).to.not.be.null;
        });
    });

    it('4. Λήψη όλων των Δωματίων', () => {
        cy.request({
            method: 'GET',
            url: '/rooms/',
        }).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body.length).to.be.greaterThan(0);
        });
    });

    it('5. Έλεγχος Διαθεσιμότητας', () => {
        const arrivalDate = new Date().toISOString().split('T')[0];
        const departureDate = new Date(Date.now() + 86400000).toISOString().split('T')[0]; // Η επόμενη ημέρα

        availabilityData = {
            arrival: arrivalDate,
            departure: departureDate,
            capacity: 2,
            rooms_needed: 1
        };

        cy.request({
            method: 'POST',
            url: 'http://localhost:8000/booking/check-availability/',
            body: availabilityData
        }).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body.message).to.eq('Room(s) available');
        });
    });

    it('6. Δημιουργία Κράτησης', () => {
        bookingData = {
            username: clientData.username,
            password: clientData.password,
            arrival: new Date().toISOString().split('T')[0],
            departure: new Date(Date.now() + 86400000).toISOString().split('T')[0],
            capacity: 2,
            rooms_needed: 1
        };

        cy.request({
            method: 'POST',
            url: 'http://localhost:8000/booking/modify-reservation/',
            body: bookingData
        }).then(response => {
            expect(response.status).to.eq(201);
            expect(response.body.message).to.include('Booking successful');
        });
    });


    it('7. Επιστροφή Τελευταίας Κράτησης', () => {
        cy.request({
            method: 'GET',
            url: '/booking/last/',
        }).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body.last_b_id).to.not.be.null;
        });
    });

    it('8. Δημιουργία Πληρωμής', () => {
        // Αρχικά, κάνουμε ένα αίτημα για να πάρουμε το τελευταίο booking
        cy.request({
            method: 'GET',
            url: 'http://localhost:8000/booking/last/', // Προσοχή στο endpoint
        }).then(response => {
            // Ελέγχουμε αν το αίτημα ήταν επιτυχές
            expect(response.status).to.eq(200);

            // Καταγραφή του response για debugging
            cy.log('GET /booking/last/ response:', response.body);

            const lastBookingId = response.body.last_b_id;

            // Ελέγχουμε αν υπάρχει το τελευταίο booking
            if (lastBookingId) {
                const paymentData = {
                    bookings: [lastBookingId], // Πρέπει να είναι λίστα !!!
                    number: "1234567812341111",
                    name: "NEW CLIENT",
                    month_year: "1225",
                    CVV: "999"
                };

                // Καταγραφή των δεδομένων πληρωμής για debugging
                cy.log('Payment Data:', paymentData);

                // Κάνουμε το αίτημα πληρωμής
                cy.request({
                    method: 'POST',
                    url: 'http://localhost:8000/payments/',
                    body: paymentData
                }).then(paymentResponse => {
                    // Καταγραφή του response της πληρωμής για debugging
                    cy.log('POST /payments/ response:', paymentResponse.body);

                    // Επαληθεύουμε την απόκριση
                    expect(paymentResponse.status).to.eq(201);
                    expect(paymentResponse.body.message).to.include('Payment successful');
                });
            } else {
                throw new Error("Δεν βρέθηκε το τελευταίο booking.");
            }
        });
    });



    it('9. Δημιουργία Μηνύματος', () => {
        cy.request({
            method: 'POST',
            url: 'http://localhost:8000/message/',
            body: messageData
        }).then(response => {
            expect(response.status).to.eq(201);
        });
    });
});

