exports.calculateRecommendation = (weight, height, gender, age, activityLevel) => {
    const bmi = weight / ((height / 100) ** 2);
    let maintenanceCalories;
    let photoLink = ''; // Inisialisasi variabel photoLink

    // Perhitungan kalori berdasarkan tingkat aktivitas
    switch (activityLevel.toLowerCase()) {
        case 'ringan':
            maintenanceCalories = bmi * 25;
            break;
        case 'sedang':
            maintenanceCalories = bmi * 30;
            photoLink = 'https://storage.googleapis.com/recommendasi-meals/recomendasi/Ideal.jpg';
            break;
        case 'berat':
            maintenanceCalories = bmi * 35;
            break;
        default:
            maintenanceCalories = bmi * 25;
    }

    // Perhitungan bulking dan cutting
    const bulkingCalories = maintenanceCalories + 500;
    const cuttingCalories = maintenanceCalories - 500;

    console.log('Calculated values - Maintenance:', maintenanceCalories, 'Bulking:', bulkingCalories, 'Cutting:', cuttingCalories);

    // Menentukan program berdasarkan BMI
    const program = bmi < 18.5 ? 'bulking' : bmi > 25 ? 'cutting' : 'maintenance';

    // Tentukan link foto berdasarkan program
    if (program === 'bulking') {
        photoLink = 'https://storage.googleapis.com/recommendasi-meals/recomendasi/Kurus.jpg';
    } else if (program === 'cutting') {
        photoLink = 'https://storage.googleapis.com/recommendasi-meals/recomendasi/Gemuk.jpg';
    }

    return {
        maintenance: maintenanceCalories,
        bulking: bulkingCalories,
        cutting: cuttingCalories,
        program: program,
        photo: photoLink,
    };
};
