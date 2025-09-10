import React, { useState, useEffect } from 'react';

const App = () => {
  const [currentPage, setCurrentPage] = useState('login');
  const [userType, setUserType] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [labs, setLabs] = useState([
    {
      id: 1,
      name: 'Lab Pemrograman Dasar 1',
      location: 'Gedung A, Lantai 2',
      computers: 30,
      computerType: 'PC Desktop',
      specs: 'Intel i5, 8GB RAM, 256GB SSD',
      rules: [
        'Dilarang membawa makanan dan minuman',
        'Gunakan headphone saat memutar audio',
        'Matikan perangkat setelah selesai digunakan',
        'Laporkan kerusakan segera ke operator'
      ],
      devices: Array.from({ length: 30 }, (_, i) => ({
        id: i + 1,
        status: i % 5 === 0 ? 'broken' : 'ok',
        issues: i % 5 === 0 ? ['Monitor tidak menyala', 'Keyboard tidak berfungsi'] : []
      }))
    },
    {
      id: 2,
      name: 'Lab Pemrograman Dasar 2',
      location: 'Gedung A, Lantai 3',
      computers: 25,
      computerType: 'PC Desktop',
      specs: 'Intel i5, 16GB RAM, 512GB SSD',
      rules: [
        'Dilarang membawa makanan dan minuman',
        'Gunakan headphone saat memutar audio',
        'Matikan perangkat setelah selesai digunakan',
        'Laporkan kerusakan segera ke operator'
      ],
      devices: Array.from({ length: 25 }, (_, i) => ({
        id: i + 1,
        status: i % 7 === 0 ? 'broken' : 'ok',
        issues: i % 7 === 0 ? ['Mouse tidak berfungsi'] : []
      }))
    },
    {
      id: 3,
      name: 'Lab Server',
      location: 'Gedung B, Lantai 1',
      computers: 10,
      computerType: 'Server Rack',
      specs: 'Dual Xeon, 64GB RAM, 2TB SSD RAID',
      rules: [
        'Hanya untuk penggunaan server',
        'Izin khusus diperlukan',
        'Jangan sentuh perangkat tanpa pengawasan',
        'Catat semua perubahan konfigurasi'
      ],
      devices: Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        status: i % 4 === 0 ? 'warning' : 'ok',
        issues: i % 4 === 0 ? ['Suhu tinggi'] : []
      }))
    }
  ]);
  const [schedules, setSchedules] = useState([
    {
      id: 1,
      labId: 1,
      day: 'Senin',
      startTime: '08:00',
      endTime: '10:00',
      className: 'Pemrograman Dasar',
      purpose: 'Praktikum',
      lecturer: 'Dr. Ahmad'
    },
    {
      id: 2,
      labId: 1,
      day: 'Senin',
      startTime: '10:00',
      endTime: '12:00',
      className: 'Struktur Data',
      purpose: 'Praktikum',
      lecturer: 'Dr. Budi'
    },
    {
      id: 3,
      labId: 2,
      day: 'Selasa',
      startTime: '08:00',
      endTime: '10:00',
      className: 'Jaringan Komputer',
      purpose: 'Praktikum',
      lecturer: 'Dr. Candra'
    }
  ]);
  const [tickets, setTickets] = useState([]);
  const [selectedLab, setSelectedLab] = useState(null);
  const [showDeviceModal, setShowDeviceModal] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [days] = useState(['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']);
  const [selectedDay, setSelectedDay] = useState('Senin');

  // Mock data for bookings
  useEffect(() => {
    if (isLoggedIn && currentUser) {
      const mockBookings = [
        {
          id: 1,
          user: currentUser.name,
          userId: currentUser.id,
          userType: currentUser.type,
          lab: 'Lab Pemrograman Dasar 1',
          date: '2024-01-15',
          time: '09:00 - 11:00',
          purpose: 'Mata Kuliah',
          course: 'Pemrograman Dasar',
          status: 'Disetujui',
          createdAt: '2024-01-10'
        },
        {
          id: 2,
          user: currentUser.name,
          userId: currentUser.id,
          userType: currentUser.type,
          lab: 'Lab Pemrograman Dasar 2',
          date: '2024-01-16',
          time: '13:00 - 15:00',
          purpose: 'Penelitian',
          course: '',
          status: 'Pending',
          createdAt: '2024-01-11'
        }
      ];
      setBookings(mockBookings);
    }
  }, [isLoggedIn, currentUser]);

  const handleLogin = (e) => {
    e.preventDefault();
    // Mock login
    const mockUser = {
      id: '12345',
      name: 'John Doe',
      type: userType,
      nim: userType === 'Mahasiswa' ? '1234567890' : '9876543210'
    };
    setCurrentUser(mockUser);
    setIsLoggedIn(true);
    setCurrentPage(userType === 'Operator' ? 'operator-dashboard' : 'home');
  };

  const handleRegister = (e) => {
    e.preventDefault();
    // Mock register
    alert('Registrasi berhasil! Silakan login.');
    setCurrentPage('login');
  };

  const handleBooking = (e) => {
    e.preventDefault();
    // Mock booking
    const newBooking = {
      id: bookings.length + 1,
      user: currentUser.name,
      userId: currentUser.id,
      userType: currentUser.type,
      lab: e.target.lab.value,
      date: e.target.date.value,
      time: `${e.target.startTime.value} - ${e.target.endTime.value}`,
      purpose: e.target.purpose.value,
      course: e.target.course?.value || '',
      otherReason: e.target.otherReason?.value || '',
      status: 'Pending',
      createdAt: new Date().toISOString().split('T')[0]
    };
    setBookings([...bookings, newBooking]);
    alert('Peminjaman berhasil diajukan!');
    setCurrentPage('home');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setCurrentPage('login');
  };

  const openDeviceModal = (device) => {
    setSelectedDevice(device);
    setShowDeviceModal(true);
  };

  const closeDeviceModal = () => {
    setShowDeviceModal(false);
    setSelectedDevice(null);
  };

  const createTicket = () => {
    if (selectedDevice) {
      const newTicket = {
        id: tickets.length + 1,
        labId: selectedLab.id,
        labName: selectedLab.name,
        deviceId: selectedDevice.id,
        issues: selectedDevice.issues,
        status: 'Open',
        priority: 'High',
        reportedBy: currentUser.name,
        reportedAt: new Date().toISOString()
      };
      setTickets([...tickets, newTicket]);
      alert('Tiket perbaikan telah dibuat!');
    }
    closeDeviceModal();
  };

  const markAsFixed = () => {
    if (selectedDevice && selectedLab) {
      const updatedLabs = [...labs];
      const labIndex = updatedLabs.findIndex(lab => lab.id === selectedLab.id);
      if (labIndex !== -1) {
        const deviceIndex = updatedLabs[labIndex].devices.findIndex(d => d.id === selectedDevice.id);
        if (deviceIndex !== -1) {
          updatedLabs[labIndex].devices[deviceIndex].status = 'ok';
          updatedLabs[labIndex].devices[deviceIndex].issues = [];
          setLabs(updatedLabs);
          alert('Perangkat ditandai sebagai sudah diperbaiki!');
        }
      }
    }
    closeDeviceModal();
  };

  // Render different components based on current page
  const renderLoginPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Sistem Peminjaman Lab</h1>
          <p className="text-gray-600">Universitas Teknologi</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Jenis User</label>
            <select 
              value={userType} 
              onChange={(e) => setUserType(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">Pilih Jenis User</option>
              <option value="Mahasiswa">Mahasiswa</option>
              <option value="Dosen">Dosen</option>
              <option value="Operator">Operator</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {userType === 'Mahasiswa' ? 'NIM' : userType === 'Dosen' ? 'NIP' : 'Username'}
            </label>
            <input 
              type="text" 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder={userType === 'Mahasiswa' ? 'Masukkan NIM' : userType === 'Dosen' ? 'Masukkan NIP' : 'Masukkan Username'}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input 
              type="password" 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Masukkan password"
              required
            />
          </div>
          
          <button 
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
          >
            Login
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Belum punya akun?{' '}
            <button 
              onClick={() => setCurrentPage('register')}
              className="text-blue-600 font-semibold hover:underline"
            >
              Daftar sekarang
            </button>
          </p>
        </div>
      </div>
    </div>
  );

  const renderRegisterPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Registrasi Akun</h1>
          <p className="text-gray-600">Buat akun baru untuk peminjaman lab</p>
        </div>
        
        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Jenis User</label>
            <select 
              value={userType} 
              onChange={(e) => setUserType(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            >
              <option value="">Pilih Jenis User</option>
              <option value="Mahasiswa">Mahasiswa</option>
              <option value="Dosen">Dosen</option>
              <option value="Operator">Operator</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap</label>
            <input 
              type="text" 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Masukkan nama lengkap"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {userType === 'Mahasiswa' ? 'NIM' : 'NIP'}
            </label>
            <input 
              type="text" 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder={userType === 'Mahasiswa' ? 'Masukkan NIM' : 'Masukkan NIP'}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input 
              type="password" 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Buat password"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Verifikasi Password</label>
            <input 
              type="password" 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Masukkan ulang password"
              required
            />
          </div>
          
          <button 
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition duration-300"
          >
            Daftar
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Sudah punya akun?{' '}
            <button 
              onClick={() => setCurrentPage('login')}
              className="text-green-600 font-semibold hover:underline"
            >
              Login sekarang
            </button>
          </p>
        </div>
      </div>
    </div>
  );

  const renderHomePage = () => (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-800">Beranda</h1>
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-600">{currentUser?.name}</span>
              <button 
                onClick={handleLogout}
                className="text-red-600 text-sm font-medium hover:text-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-md mx-auto px-4">
          <div className="flex">
            {['home', 'schedule', 'labs', 'account'].map((item) => (
              <button
                key={item}
                onClick={() => setCurrentPage(item)}
                className={`flex-1 py-3 text-center text-sm font-medium transition-colors ${
                  currentPage === item
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {item === 'home' && 'Beranda'}
                {item === 'schedule' && 'Jadwal'}
                {item === 'labs' && 'Info Lab'}
                {item === 'account' && 'Akun'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto px-4 py-6">
        {/* Booking Form */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Form Peminjaman Lab</h2>
          
          <form onSubmit={handleBooking} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Jenis Lab</label>
              <select 
                name="lab"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Pilih Jenis Lab</option>
                <option value="Lab Pemrograman Dasar 1">Lab Pemrograman Dasar 1</option>
                <option value="Lab Pemrograman Dasar 2">Lab Pemrograman Dasar 2</option>
                <option value="Lab Pemrograman Dasar 3">Lab Pemrograman Dasar 3</option>
                <option value="Lab Pemrograman Dasar 4">Lab Pemrograman Dasar 4</option>
                <option value="Lab Pemrograman Dasar 5">Lab Pemrograman Dasar 5</option>
                <option value="Lab Mandiri">Lab Mandiri</option>
                <option value="Lab Server">Lab Server</option>
              </select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal</label>
                <input 
                  type="date" 
                  name="date"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mulai</label>
                  <input 
                    type="time" 
                    name="startTime"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Selesai</label>
                  <input 
                    type="time" 
                    name="endTime"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tujuan Peminjaman</label>
              <select 
                name="purpose"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Pilih Tujuan</option>
                <option value="Mata Kuliah">Mata Kuliah</option>
                <option value="Penelitian">Penelitian</option>
                <option value="Lainnya">Lainnya</option>
              </select>
            </div>
            
            {document.querySelector('select[name="purpose"]')?.value === 'Mata Kuliah' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mata Kuliah</label>
                <input 
                  type="text" 
                  name="course"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Masukkan nama mata kuliah"
                />
              </div>
            )}
            
            {document.querySelector('select[name="purpose"]')?.value === 'Lainnya' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Alasan</label>
                <textarea 
                  name="otherReason"
                  rows="3"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Jelaskan alasan peminjaman"
                ></textarea>
              </div>
            )}
            
            <button 
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
            >
              Ajukan Peminjaman
            </button>
          </form>
        </div>

        {/* Current Bookings */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Peminjaman Terkini</h2>
          
          {bookings.length === 0 ? (
            <p className="text-gray-500 text-center py-4">Belum ada peminjaman</p>
          ) : (
            <div className="space-y-4">
              {bookings.slice(0, 3).map((booking) => (
                <div key={booking.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-gray-800">{booking.lab}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      booking.status === 'Disetujui' ? 'bg-green-100 text-green-800' :
                      booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {booking.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{booking.date} | {booking.time}</p>
                  <p className="text-sm text-gray-600">Tujuan: {booking.purpose} {booking.course && `(${booking.course})`}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent History */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Riwayat Peminjaman</h2>
          
          {bookings.length === 0 ? (
            <p className="text-gray-500 text-center py-4">Belum ada riwayat peminjaman</p>
          ) : (
            <div className="space-y-3">
              {bookings.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                  <div>
                    <p className="font-medium text-gray-800">{booking.lab}</p>
                    <p className="text-sm text-gray-600">{booking.date}</p>
                  </div>
                  <span className="text-sm text-gray-500">{booking.time}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderSchedulePage = () => (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-800">Jadwal Lab</h1>
            <button 
              onClick={handleLogout}
              className="text-red-600 text-sm font-medium hover:text-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-md mx-auto px-4">
          <div className="flex">
            {['home', 'schedule', 'labs', 'account'].map((item) => (
              <button
                key={item}
                onClick={() => setCurrentPage(item)}
                className={`flex-1 py-3 text-center text-sm font-medium transition-colors ${
                  currentPage === item
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {item === 'home' && 'Beranda'}
                {item === 'schedule' && 'Jadwal'}
                {item === 'labs' && 'Info Lab'}
                {item === 'account' && 'Akun'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto px-4 py-6">
        {/* Day Filter */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">Pilih Hari</label>
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {days.map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedDay === day
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        {/* Labs List */}
        <div className="space-y-4">
          {labs.map((lab) => {
            const labSchedules = schedules.filter(s => s.day === selectedDay && s.labId === lab.id);
            
            return (
              <div key={lab.id} className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">{lab.name}</h3>
                
                {labSchedules.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">Tidak ada jadwal untuk hari ini</p>
                ) : (
                  <div className="space-y-3">
                    {labSchedules.map((schedule) => (
                      <div key={schedule.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-medium text-gray-800">{schedule.className}</span>
                          <span className="text-sm text-gray-500">{schedule.purpose}</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{schedule.startTime} - {schedule.endTime}</p>
                        <p className="text-sm text-gray-600">Dosen: {schedule.lecturer}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderLabsPage = () => (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-800">Informasi Lab</h1>
            <button 
              onClick={handleLogout}
              className="text-red-600 text-sm font-medium hover:text-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-md mx-auto px-4">
          <div className="flex">
            {['home', 'schedule', 'labs', 'account'].map((item) => (
              <button
                key={item}
                onClick={() => setCurrentPage(item)}
                className={`flex-1 py-3 text-center text-sm font-medium transition-colors ${
                  currentPage === item
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {item === 'home' && 'Beranda'}
                {item === 'schedule' && 'Jadwal'}
                {item === 'labs' && 'Info Lab'}
                {item === 'account' && 'Akun'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto px-4 py-6">
        <div className="space-y-4">
          {labs.map((lab) => (
            <div key={lab.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{lab.name}</h3>
                <p className="text-sm text-gray-600 mb-3">📍 {lab.location}</p>
                
                <div className="mb-4">
                  <h4 className="font-medium text-gray-800 mb-2">Inventaris</h4>
                  <p className="text-sm text-gray-600">Komputer: {lab.computers} unit</p>
                  <p className="text-sm text-gray-600">Jenis: {lab.computerType}</p>
                  <p className="text-sm text-gray-600">Spesifikasi: {lab.specs}</p>
                </div>
                
                <div className="mb-4">
                  <h4 className="font-medium text-gray-800 mb-2">Aturan & SOP</h4>
                  <ul className="space-y-1">
                    {lab.rules.map((rule, index) => (
                      <li key={index} className="text-sm text-gray-600">• {rule}</li>
                    ))}
                  </ul>
                </div>
                
                <button
                  onClick={() => {
                    setSelectedLab(lab);
                    setCurrentPage('lab-monitoring');
                  }}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition duration-300"
                >
                  Detail Lanjutan (Monitoring Real-time)
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderLabMonitoringPage = () => (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => setCurrentPage('labs')}
              className="text-blue-600 font-medium"
            >
              ← Kembali
            </button>
            <h1 className="text-xl font-bold text-gray-800">Monitoring {selectedLab?.name}</h1>
            <button 
              onClick={handleLogout}
              className="text-red-600 text-sm font-medium hover:text-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Status Perangkat</h2>
          
          <div className="grid grid-cols-5 gap-3 mb-6">
            {selectedLab?.devices.map((device) => (
              <div
                key={device.id}
                onClick={() => openDeviceModal(device)}
                className={`aspect-square rounded-lg flex items-center justify-center text-xs font-bold cursor-pointer transition-transform hover:scale-105 ${
                  device.status === 'ok' ? 'bg-green-500 text-white' :
                  device.status === 'broken' ? 'bg-red-500 text-white' :
                  'bg-yellow-500 text-white'
                }`}
              >
                {device.id}
              </div>
            ))}
          </div>
          
          <div className="flex justify-center space-x-6 text-sm">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
              <span>Normal</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-yellow-500 rounded mr-2"></div>
              <span>Peringatan</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-red-500 rounded mr-2"></div>
              <span>Rusak</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Informasi Lab</h2>
          <p className="text-sm text-gray-600 mb-2">📍 {selectedLab?.location}</p>
          <p className="text-sm text-gray-600 mb-2">💻 Komputer: {selectedLab?.computers} unit</p>
          <p className="text-sm text-gray-600">📏 Spesifikasi: {selectedLab?.specs}</p>
        </div>
      </div>

      {/* Device Modal */}
      {showDeviceModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Detail Perangkat Meja #{selectedDevice?.id}
            </h3>
            
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Status:</p>
              <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                selectedDevice?.status === 'ok' ? 'bg-green-100 text-green-800' :
                selectedDevice?.status === 'broken' ? 'bg-red-100 text-red-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {selectedDevice?.status === 'ok' ? 'Normal' :
                 selectedDevice?.status === 'broken' ? 'Rusak' : 'Peringatan'}
              </div>
            </div>
            
            {selectedDevice?.issues && selectedDevice.issues.length > 0 && (
              <div className="mb-6">
                <p className="text-sm font-medium text-gray-700 mb-2">Masalah Terdeteksi:</p>
                <ul className="space-y-1">
                  {selectedDevice.issues.map((issue, index) => (
                    <li key={index} className="text-sm text-red-600">• {issue}</li>
                  ))}
                </ul>
              </div>
            )}
            
            <div className="flex space-x-3">
              <button
                onClick={createTicket}
                className="flex-1 bg-red-600 text-white py-2 rounded-lg font-medium hover:bg-red-700 transition duration-300"
              >
                Buat Tiket Perbaikan
              </button>
              {selectedDevice?.status !== 'ok' && (
                <button
                  onClick={markAsFixed}
                  className="flex-1 bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition duration-300"
                >
                  Tandai Diperbaiki
                </button>
              )}
            </div>
            
            <button
              onClick={closeDeviceModal}
              className="w-full mt-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-300"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const renderAccountPage = () => (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-800">Akun Pengguna</h1>
            <button 
              onClick={handleLogout}
              className="text-red-600 text-sm font-medium hover:text-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-md mx-auto px-4">
          <div className="flex">
            {['home', 'schedule', 'labs', 'account'].map((item) => (
              <button
                key={item}
                onClick={() => setCurrentPage(item)}
                className={`flex-1 py-3 text-center text-sm font-medium transition-colors ${
                  currentPage === item
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {item === 'home' && 'Beranda'}
                {item === 'schedule' && 'Jadwal'}
                {item === 'labs' && 'Info Lab'}
                {item === 'account' && 'Akun'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto px-4 py-6">
        {/* User Info */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Profil Pengguna</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Nama</span>
              <span className="font-medium">{currentUser?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Jenis User</span>
              <span className="font-medium">{currentUser?.type}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">{currentUser?.type === 'Mahasiswa' ? 'NIM' : 'NIP'}</span>
              <span className="font-medium">{currentUser?.nim}</span>
            </div>
          </div>
        </div>

        {/* CS Report Form */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Laporan Masalah</h2>
          
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Kategori Masalah</label>
              <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">Pilih Kategori</option>
                <option value="hardware">Kerusakan Hardware</option>
                <option value="software">Masalah Software</option>
                <option value="network">Masalah Jaringan</option>
                <option value="other">Keluhan Umum</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Prioritas</label>
              <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="low">Rendah</option>
                <option value="medium">Sedang</option>
                <option value="high">Tinggi</option>
                <option value="urgent">Segera</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Deskripsi Masalah</label>
              <textarea 
                rows="4"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Jelaskan masalah yang Anda alami..."
              ></textarea>
            </div>
            
            <button 
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
            >
              Kirim Laporan
            </button>
          </form>
        </div>

        {/* Booking History */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Riwayat Peminjaman</h2>
          
          {bookings.length === 0 ? (
            <p className="text-gray-500 text-center py-4">Belum ada riwayat peminjaman</p>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking) => (
                <div 
                  key={booking.id} 
                  className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => {
                    // Show booking details modal
                    alert(`Detail Peminjaman:\n\nLab: ${booking.lab}\nTanggal: ${booking.date}\nWaktu: ${booking.time}\nTujuan: ${booking.purpose}\nStatus: ${booking.status}`);
                  }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-gray-800">{booking.lab}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      booking.status === 'Disetujui' ? 'bg-green-100 text-green-800' :
                      booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {booking.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{booking.date} | {booking.time}</p>
                  <p className="text-sm text-gray-600">Tujuan: {booking.purpose}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderOperatorDashboard = () => (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-800">Dashboard Operator</h1>
            <button 
              onClick={handleLogout}
              className="text-red-600 text-sm font-medium hover:text-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-md mx-auto px-4">
          <div className="flex overflow-x-auto">
            {['operator-dashboard', 'operator-bookings', 'operator-schedule', 'operator-users', 'operator-inventory'].map((item) => (
              <button
                key={item}
                onClick={() => setCurrentPage(item)}
                className={`flex-shrink-0 px-4 py-3 text-center text-sm font-medium whitespace-nowrap transition-colors ${
                  currentPage === item
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {item === 'operator-dashboard' && 'Dashboard'}
                {item === 'operator-bookings' && 'Peminjaman'}
                {item === 'operator-schedule' && 'Jadwal'}
                {item === 'operator-users' && 'Pengguna'}
                {item === 'operator-inventory' && 'Inventaris'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto px-4 py-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-600">Peminjaman Baru</p>
                <p className="text-lg font-semibold text-gray-800">12</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-600">Menunggu Persetujuan</p>
                <p className="text-lg font-semibold text-gray-800">8</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-600">Peminjaman Aktif</p>
                <p className="text-lg font-semibold text-gray-800">5</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-600">Laporan Baru</p>
                <p className="text-lg font-semibold text-gray-800">3</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Aksi Cepat</h2>
          <div className="grid grid-cols-2 gap-3">
            <button className="bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition duration-300">
              Approve Booking
            </button>
            <button className="bg-orange-600 text-white py-3 rounded-lg font-medium hover:bg-orange-700 transition duration-300">
              Jadwal Darurat
            </button>
            <button className="bg-red-600 text-white py-3 rounded-lg font-medium hover:bg-red-700 transition duration-300">
              Tiket Maintenance
            </button>
            <button className="bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700 transition duration-300">
              Kirim Pengumuman
            </button>
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Peminjaman Terbaru</h2>
          <div className="space-y-3">
            {bookings.slice(0, 3).map((booking) => (
              <div key={booking.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium text-gray-800">{booking.user}</h3>
                    <p className="text-sm text-gray-600">{booking.userType}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    booking.status === 'Disetujui' ? 'bg-green-100 text-green-800' :
                    booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {booking.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-1">{booking.lab}</p>
                <p className="text-sm text-gray-600">{booking.date} | {booking.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderOperatorBookings = () => (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => setCurrentPage('operator-dashboard')}
              className="text-blue-600 font-medium"
            >
              ← Kembali
            </button>
            <h1 className="text-xl font-bold text-gray-800">Manajemen Peminjaman</h1>
            <button 
              onClick={handleLogout}
              className="text-red-600 text-sm font-medium hover:text-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 border-b">
        <div className="flex space-x-2 mb-3">
          <select className="flex-1 p-2 border border-gray-300 rounded text-sm">
            <option value="">Semua Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Disetujui</option>
            <option value="rejected">Ditolak</option>
          </select>
          <select className="flex-1 p-2 border border-gray-300 rounded text-sm">
            <option value="">Semua Lab</option>
            <option value="lab1">Lab Pemrograman Dasar 1</option>
            <option value="lab2">Lab Pemrograman Dasar 2</option>
          </select>
        </div>
        <input 
          type="text" 
          placeholder="Cari nama peminjam..." 
          className="w-full p-2 border border-gray-300 rounded text-sm"
        />
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto px-4 py-6">
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div key={booking.id} className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-medium text-gray-800">{booking.user}</h3>
                  <p className="text-sm text-gray-600">{booking.userType} • {booking.userId}</p>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  booking.status === 'Disetujui' ? 'bg-green-100 text-green-800' :
                  booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {booking.status}
                </span>
              </div>
              
              <div className="mb-3">
                <p className="text-sm text-gray-600"><strong>Lab:</strong> {booking.lab}</p>
                <p className="text-sm text-gray-600"><strong>Tanggal:</strong> {booking.date} | {booking.time}</p>
                <p className="text-sm text-gray-600"><strong>Tujuan:</strong> {booking.purpose} {booking.course && `(${booking.course})`}</p>
              </div>
              
              <div className="flex space-x-2">
                <button className="flex-1 bg-green-600 text-white py-2 rounded text-sm font-medium hover:bg-green-700 transition duration-300">
                  Approve
                </button>
                <button className="flex-1 bg-red-600 text-white py-2 rounded text-sm font-medium hover:bg-red-700 transition duration-300">
                  Reject
                </button>
                <button className="flex-1 bg-blue-600 text-white py-2 rounded text-sm font-medium hover:bg-blue-700 transition duration-300">
                  Detail
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Render based on current page
  switch (currentPage) {
    case 'login':
      return renderLoginPage();
    case 'register':
      return renderRegisterPage();
    case 'home':
      return renderHomePage();
    case 'schedule':
      return renderSchedulePage();
    case 'labs':
      return renderLabsPage();
    case 'lab-monitoring':
      return renderLabMonitoringPage();
    case 'account':
      return renderAccountPage();
    case 'operator-dashboard':
      return renderOperatorDashboard();
    case 'operator-bookings':
      return renderOperatorBookings();
    default:
      return renderLoginPage();
  }
};

export default App;
