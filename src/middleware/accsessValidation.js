const jwt = require('jsonwebtoken');

const accessValidation = async (request, h) => {
    const authorization = request.headers.authorization;

    // Periksa apakah header Authorization tersedia
    if (!authorization) {
        return h
            .response({ message: 'Token diperlukan' })
            .code(401)
            .takeover();
    }

    // Pastikan token memiliki format yang benar
    const parts = authorization.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        return h
            .response({ message: 'Format token salah' })
            .code(401)
            .takeover();
    }

    const token = parts[1];
    const secret = process.env.JWT_SECRET;

    if (!secret) {
        console.error('JWT_SECRET tidak diatur dalam environment');
        return h
            .response({ message: 'Konfigurasi server bermasalah' })
            .code(500)
            .takeover();
    }

    try {
        // Verifikasi token
        const jwtDecode = jwt.verify(token, secret);
        request.userData = jwtDecode; // Simpan data pengguna di `request`
    } catch (error) {
        // Berikan pesan kesalahan spesifik
        const errorMessage =
            error.name === 'TokenExpiredError'
                ? 'Token telah kedaluwarsa'
                : 'Token tidak valid';

        return h
            .response({ message: errorMessage })
            .code(401)
            .takeover();
    }

    return h.continue;
};

module.exports = accessValidation;
