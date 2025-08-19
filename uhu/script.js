// --- VALIDATION LOGIC ---
const operatorPrefixes = {
    'Telkomsel': ['0811', '0812', '0813', '0821', '0822', '0823', '0851', '0852', '0853'],
    'by.U': ['0851'],
    'Indosat Ooredoo': ['0814', '0815', '0816', '0855', '0856', '0857', '0858'],
    'Tri (3)': ['0895', '0896', '0897', '0898', '0899'],
    'XL Axiata': ['0817', '0818', '0819', '0859', '0877', '0878', '0879'],
    'Live.On': ['0859'],
    'Axis': ['0831', '0832', '0833', '0838'],
    'Smartfren': ['0881', '0882', '0883', '0884', '0885', '0886', '0887', '0888', '0889']
};
const blacklistedNumbers = ['081234567890'];

function isInvalidPattern(nomor) {
    if (blacklistedNumbers.includes(nomor)) return true;
    const numberPart = nomor.substring(2);
    if (/(\d)\1{4,}/.test(numberPart)) return true;
    for (let i = 0; i < numberPart.length - 4; i++) {
        const sub = numberPart.substring(i, i + 5);
        const isAscending = '0123456789'.includes(sub);
        const isDescending = '9876543210'.includes(sub);
        if (isAscending || isDescending) return true;
    }
    const uniqueDigits = new Set(numberPart.split(''));
    if (uniqueDigits.size < 4) return true;
    if (/(..)\1\1/.test(numberPart)) return true;
    return false;
}

function getOperatorFromNumber(nomor) {
    const prefix = nomor.substring(0, 4);
    for (const operator in operatorPrefixes) {
        if (operatorPrefixes[operator].includes(prefix)) {
            return operator;
        }
    }
    return null;
}

function validatePhoneNumber(nomorHp) {
    const genericError = { isValid: false, message: 'Silahkan isi dengan nomor yang benar' };

    if (nomorHp.length < 10) {
        return genericError;
    }

    const operator = getOperatorFromNumber(nomorHp);
    if (!operator) {
        return genericError;
    }

    const maxLength = operator === 'Tri (3)' ? 13 : 12;
    if (nomorHp.length > maxLength) {
        return genericError;
    }

    if (isInvalidPattern(nomorHp)) {
        return genericError;
    }

    return { isValid: true, message: 'Nomor valid.' };
}

document.addEventListener('DOMContentLoaded', function() {

    // --- ELEMENTS ---
    const elements = {
        mainContentContainer: document.getElementById('main-content-container'),
        paymentInstructionContainer: document.getElementById('payment-instruction-container'),
        footer: document.getElementById('footer'),
        currentYear: document.getElementById('currentYear'),
        productInfoFormTop: document.getElementById('product-info-form-top'),
        featuresBeforeForm: document.getElementById('features-before-form'),
        paymentMethodSelection: document.getElementById('payment-method-selection'),
        orderDetailsInForm: document.getElementById('order-details-in-form'),
        testimonialsFull: document.getElementById('testimonials-full'),
        faqFull: document.getElementById('faq-full'),
        policyFull: document.getElementById('policy-full'),
        orderForm: document.getElementById('orderForm'),
        submitBtn: document.getElementById('submit-btn'),
        notifBox: document.getElementById('notifBox'),
        notifName: document.querySelector('#notifBox .notif-name'),
        detailsModal: document.getElementById('detailsModal'),
        detailsModalContent: document.getElementById('detailsModalContent'),
    };

    // --- CONFIGURATION ---
    const uniqueCode = Math.floor(Math.random() * (500 - 100 + 1)) + 100;
    let countdownInterval;
    let expiryTime;
    let currentOrderDetails = {};

    // *** TESTIMONIALS COMBINED ***
    const allTestimonials = [
        "https://s6.imgcdn.dev/YIh45V.png",
        "https://s6.imgcdn.dev/YIhuYh.png",
        "https://s6.imgcdn.dev/YIhCOK.png",
        "https://s6.imgcdn.dev/YIhIgo.png",
        "https://s6.imgcdn.dev/YIhQQO.png",
        "https://s6.imgcdn.dev/YIhiSn.png",
        "https://s6.imgcdn.dev/YIhkeg.png",
        "https://s6.imgcdn.dev/YIhscv.png",
        "https://s6.imgcdn.dev/YIhyaN.png",
        "https://s6.imgcdn.dev/YIh5tq.png",
        "https://s6.imgcdn.dev/YIhPYB.png",
        "https://s6.imgcdn.dev/YIhTKu.png"
    ];

    const packages = {
        drive: {
            id: 'drive',
            name: "Google Drive Unlimited",
            price: 99000,
            normalPrice: 399000,
            title: "DRIVE UNLIMITED",
            priceDisplay: `Rp99.000`,
            logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Google_Drive_icon_%282020%29.svg/330px-Google_Drive_icon_%282020%29.svg.png',
            description: "Penyimpanan cloud tanpa batas untuk semua file Anda.",
            features: [
                "<strong>Penyimpanan Cloud Tanpa Batas:</strong> Simpan semua file, dokumen, foto, dan video tanpa khawatir kehabisan ruang.",
                "<strong>Akses File Di Mana Saja:</strong> Buka dan edit file Anda dari komputer, tablet, atau smartphone.",
                "<strong>Berbagi & Kolaborasi Mudah:</strong> Bagikan file dan folder dengan mudah, serta bekerja bersama secara real-time.",
                "<strong>Keamanan Kelas Dunia:</strong> File Anda dilindungi oleh infrastruktur keamanan canggih dari Google.",
                "<strong>Integrasi Penuh:</strong> Terhubung dengan Google Docs, Sheets, Slides, dan aplikasi favorit lainnya.",
                "<strong>Sekali Bayar Seumur Hidup:</strong> Tanpa biaya langganan bulanan atau tahunan.",
                "<strong>Gunakan Akun Pribadi Anda:</strong> Upgrade dilakukan langsung pada akun Google yang sudah Anda miliki.",
                "<strong>100% Aman & Bergaransi:</strong> Produk asli dengan jaminan privasi penuh."
            ],
            testimonials: allTestimonials
        },
        photos: {
            id: 'photos',
            name: "Google Photos Unlimited",
            price: 149000,
            normalPrice: 399000,
            title: "PHOTOS UNLIMITED",
            priceDisplay: `Rp149.000`,
            logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Google_Photos_icon_%282020%29.svg/240px-Google_Photos_icon_%282020%29.svg.png',
            description: "Simpan semua foto & video kualitas asli tanpa kompresi.",
            features: [
                "<strong>Penyimpanan Foto & Video Tanpa Batas:</strong> Upload semua kenangan Anda dalam kualitas asli tanpa kompresi.",
                "<strong>Pencarian Canggih:</strong> Temukan foto berdasarkan orang, tempat, dan objek di dalamnya.",
                "<strong>Album Otomatis:</strong> Google Photos secara cerdas membuat album dan kolase untuk Anda.",
                "<strong>Berbagi dengan Mudah:</strong> Buat album bersama dan bagikan foto dengan keluarga dan teman.",
                "<strong>Tersinkronisasi di Semua Perangkat:</strong> Foto Anda aman dan dapat diakses dari mana saja.",
                "<strong>Sekali Bayar Seumur Hidup:</strong> Tanpa biaya langganan bulanan atau tahunan.",
                "<strong>Akun baru:</strong> Anda akan mendapatkan akun Google baru khusus untuk Photos, dan Anda bisa mengganti passwordnya.",
                "<strong>100% Aman & Privasi Terjamin:</strong> Foto Anda tetap menjadi milik Anda."
            ],
            testimonials: allTestimonials
        }
    };

    let currentPackageId = 'drive'; // Paket default yang dipilih

    // --- UPDATED PAYMENT ACCOUNTS ---
    const paymentAccounts = {
        qris: {
            displayName: 'QRIS',
            accountHolder: 'Epay',
            number: '00020101021126610016ID.CO.SHOPEE.WWW01189360091800223157700208223157700303UMI51440014ID.CO.QRIS.WWW0215ID10254270621910303UMI5204481453033605802ID5904Epay6013JAKARTA PUSAT61051061062070703A0163042F15',
            logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Logo_QRIS.svg/163px-Logo_QRIS.svg.png',
            type: 'qris',
            category: 'QRIS'
        },
        cimb: {
            displayName: 'Cimb Niaga',
            accountHolder: 'Octo Pay - 6289510639366',
            number: '6289510639366',
            logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/CIMB_Niaga_logo.svg/330px-CIMB_Niaga_logo.svg.png',
            type: 'va',
            category: 'Bank Transfer'
        },
        bca_va: {
            displayName: 'BCA Virtual Account',
            accountHolder: 'Epayment',
            number: '39358089510639366',
            logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Bank_Central_Asia.svg/330px-Bank_Central_Asia.svg.png',
            type: 'va',
            category: 'Bank Transfer'
        },
        gopay: {
            displayName: 'Gopay',
            accountHolder: 'Gopay 6289510639366',
            number: '089510639366',
            logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Gopay_logo.svg/320px-Gopay_logo.svg.png',
            type: 'ewallet',
            category: 'E-Wallet'
        },
        dana: {
            displayName: 'DANA',
            accountHolder: 'DNID089510639366',
            number: '089510639366',
            logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Logo_dana_blue.svg/330px-Logo_dana_blue.svg.png',
            type: 'ewallet',
            category: 'E-Wallet'
        },
        ovo: {
            displayName: 'OVO',
            accountHolder: 'OVO Epayment',
            number: '089510639366',
            logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Logo_ovo_purple.svg/330px-Logo_ovo_purple.svg.png',
            type: 'ewallet',
            category: 'E-Wallet'
        }
    };

    // --- TEMPLATE FUNCTIONS ---
    const getProductInfoHTML = (pkg) => {
        let logoHtml = '';
        if (pkg.id === 'bundle') {
            logoHtml = `
                <div class="flex justify-center items-center gap-4 h-12">
                    <img alt="Logo Google Drive" class="h-10 w-auto" src="${packages.drive.logo}">
                    <i class="fas fa-plus text-2xl text-google-blue"></i>
                    <img alt="Logo Google Photos" class="h-10 w-auto" src="${packages.photos.logo}">
                </div>
            `;
        } else {
            logoHtml = `<div class="flex justify-center"><img alt="Logo ${pkg.name}" class="h-12 w-auto" src="${pkg.logo}"></div>`;
        }

        return `
        <div class="product-info-card">
            <div class="flex flex-col md:flex-row md:items-center md:justify-between">
                <div class="text-center mb-4 md:mb-0 flex-grow">
                    ${logoHtml}
                    <h1 class="text-2xl font-bold text-m3-on-primary-container mt-3 google-sans">${pkg.title}</h1>
                    <p class="text-md text-m3-on-surface-variant mt-1">${pkg.description}</p>
                </div>
                <div class="text-center md:text-right mt-4 md:mt-0 md:pl-6">
                    <div class="text-4xl font-bold text-google-blue google-sans">${pkg.priceDisplay}</div>
                    <p class="text-sm text-m3-on-surface-variant mt-1">Sekali Bayar Seumur Hidup</p>
                    <div class="mt-2">
                        <span class="inline-block bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full" style="background-color: var(--m3-secondary-container); color: var(--m3-on-secondary-container);">
                            <i class="fas fa-infinity mr-1"></i>
                            Unlimited Storage
                        </span>
                    </div>
                </div>
            </div>
        </div>`;
    }

    const getFeaturesHTML = (pkg) => {
        const googleColors = ['text-google-green', 'text-google-blue'];
        return `<div class="material-card-elevated p-4 md:p-6 rounded-2xl">
            <h3 class="text-xl font-bold mb-4 text-center google-sans">Yang Anda Dapatkan:</h3>
            <ul class="space-y-3">${pkg.features.map((f, index) => `<li class="flex items-start"><i class="fas fa-check-circle ${googleColors[index % googleColors.length]} mt-1 mr-3 text-lg feature-icon"></i><span class="text-theme-on-surface-variant text-sm leading-relaxed">${f}</span></li>`).join('')}</ul>
        </div>`;
    }

    const getPaymentMethodsHTML = (accounts) => {
        const groupedAccounts = {};
        for (const key in accounts) {
            const account = accounts[key];
            if (!groupedAccounts[account.category]) {
                groupedAccounts[account.category] = [];
            }
            groupedAccounts[account.category].push({ key, ...account });
        }

        let html = `<h2 class="text-lg font-bold mb-4 text-gray-800 google-sans">3. Pilih Metode Pembayaran</h2>`;
        const categoryOrder = ['QRIS', 'Bank Transfer', 'E-Wallet'];

        for (const category of categoryOrder) {
            if (groupedAccounts[category]) {
                html += `<h3 class="text-md font-semibold text-gray-700 mt-6 mb-2 google-sans">${category}</h3>`;
                html += `<div class="material-card rounded-xl payment-group">`;

                groupedAccounts[category].forEach((account, index) => {
                    const isFirst = index === 0;
                    const borderClass = isFirst ? '' : 'border-t border-gray-200';

                    html += `
                        <div class="${borderClass}">
                            <input type="radio" id="${account.key}" name="payment-method" value="${account.key}" class="payment-radio" ${index === 0 && category === 'QRIS' ? 'checked' : ''}>
                            <label for="${account.key}" class="payment-label">
                                <img src="${account.logo}" alt="Logo ${account.displayName}" class="payment-logo">
                                <span class="font-medium text-gray-800 flex-grow google-sans text-sm">${account.displayName}</span>
                                <span class="custom-radio-button"><span class="dot"></span></span>
                            </label>
                        </div>
                    `;
                });
                html += `</div>`;
            }
        }

        html += `
            <div class="bg-gray-50 p-3 mt-4 rounded-xl text-center text-xs text-gray-600">
                <i class="fas fa-shield-alt text-green-600 mr-2"></i>
                Pembayaran aman dan terenkripsi.
            </div>
        `;

        return html;
    };

    const getOrderDetailsHTML = (pkg, totalPrice) => `
        <div class="mt-8 pt-6 border-t border-m3-outline-variant">
             <h3 class="text-lg font-bold mb-4 google-sans">Rincian Pesanan</h3>
             <div class="material-card-elevated p-4 rounded-2xl space-y-3 text-m3-on-surface-variant">
                 <div class="flex justify-between items-center">
                     <span class="text-sm">${pkg.name}</span>
                     <div class="text-right">
                         <span class="font-semibold text-m3-on-surface text-md">${formatCurrency(pkg.price)}</span>
                     </div>
                 </div>
                 <div class="flex justify-between">
                     <span class="text-xs">Kode Unik</span>
                     <span class="font-medium text-m3-on-surface text-sm">${formatCurrency(uniqueCode)}</span>
                 </div>
                 <hr class="my-2 border-m3-outline-variant">
                 <div class="flex justify-between font-bold text-lg text-m3-on-surface google-sans">
                     <span>Total</span>
                     <span class="text-google-blue">${formatCurrency(totalPrice)}</span>
                 </div>
             </div>
        </div>`;

    const getTestimonialsHTML = (pkg) => {
        let imagesHTML = pkg.testimonials.map((url, index) => `
            <img src="${url}" alt="Testimoni Pelanggan ${index + 1}" class="testimonial-image w-full h-auto object-cover aspect-[3/4]" onclick="openImageModal(event, ${index})" onerror="this.onerror=null;this.src='https://placehold.co/300x400/e2e8f0/4a5568?text=Gagal\\nMuat';">
        `).join('');

        return `
        <div class="material-card p-4 md:p-6 rounded-2xl">
            <h2 class="text-2xl font-bold text-center mb-4 google-sans">Testimoni Pelanggan</h2>
            <p class="text-center text-m3-on-surface-variant text-sm mb-6">Ribuan pelanggan telah merasakan manfaat penyimpanan unlimited</p>
            <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                ${imagesHTML}
            </div>
        </div>`;
    }

    const getFaqHTML = () => `
         <div>
             <h3 class="text-2xl font-bold mb-4 text-center google-sans">Pertanyaan Umum (FAQ)</h3>
             <div class="space-y-1">
                 <details class="faq-item">
                     <summary>Apakah ini benar-benar unlimited dan seumur hidup?</summary>
                     <div class="faq-content">Ya, benar. Anda akan mendapatkan penyimpanan tanpa batas untuk paket yang dipilih (Drive, Photos, atau keduanya) dengan sistem pembayaran sekali untuk selamanya. Tidak ada biaya bulanan atau tahunan tersembunyi.</div>
                 </details>
                 <details class="faq-item">
                     <summary>Bagaimana proses upgrade untuk Google Drive?</summary>
                     <div class="faq-content">Untuk Google Drive, kami akan mengundang akun Gmail pribadi Anda untuk bergabung ke dalam "Shared Drive" khusus yang memiliki kapasitas unlimited. Anda tidak perlu memberikan password, cukup alamat email saja. Shared Drive ini akan muncul di akun Drive Anda dan bisa digunakan untuk menyimpan file apa pun.</div>
                 </details>
                 <details class="faq-item">
                     <summary>Bagaimana proses untuk Google Photos?</summary>
                     <div class="faq-content">Untuk Google Photos Unlimited, Anda akan mendapatkan sebuah akun Google baru yang sudah memiliki fitur penyimpanan foto/video kualitas asli tanpa batas. Anda akan menerima email dan password akun baru tersebut, dan Anda bisa langsung mengganti passwordnya demi keamanan. Akun ini terpisah dari akun utama Anda.</div>
                 </details>
                 <details class="faq-item">
                     <summary>Apakah ini aman dan legal?</summary>
                     <div class="faq-content">Tentu saja. Metode yang kami gunakan adalah sah melalui fitur Google Workspace. Kami tidak pernah meminta password Anda (untuk upgrade Drive) dan privasi file Anda 100% terjamin. Anda memiliki kontrol penuh atas data Anda.</div>
                 </details>
                 <details class="faq-item">
                     <summary>Apa bedanya dengan langganan Google One?</summary>
                     <div class="faq-content">Google One adalah layanan langganan resmi dari Google dengan kuota terbatas (misal 2TB) dan biaya bulanan/tahunan. Produk kami memberikan Anda penyimpanan&nbsp;unlimited&nbsp;dengan sistem&nbsp;sekali bayar untuk selamanya, memanfaatkan fitur Shared Drive.</div>
                 </details>
                 <details class="faq-item">
                     <summary>Bisakah saya memindahkan file lama saya?</summary>
                     <div class="faq-content">Tentu bisa. Anda dapat dengan mudah memindahkan file dan folder dari penyimpanan Drive pribadi Anda ke dalam Shared Drive unlimited yang baru. Untuk Google Photos, Anda perlu memindahkan foto secara manual ke akun baru yang kami berikan.</div>
                 </details>
                 <details class="faq-item">
                     <summary>Berapa lama proses aktivasinya?</summary>
                     <div class="faq-content">Prosesnya sangat cepat. Setelah Anda melakukan konfirmasi pembayaran, aktivasi biasanya selesai dalam waktu 5-15 menit, maksimal 1x24 jam.</div>
                 </details>
                 <details class="faq-item">
                     <summary>Apakah ada garansi?</summary>
                     <div class="faq-content">Kami memberikan garansi uang kembali penuh jika proses upgrade gagal karena kesalahan dari pihak kami. Kami juga memberikan garansi layanan seumur hidup. Namun, garansi tidak berlaku jika akun Anda dibatasi oleh Google karena melanggar kebijakan mereka (misalnya menyimpan file ilegal seperti software bajakan, film/musik tanpa lisensi, konten pornografi, menyebarkan virus/malware, dll).</div>
                 </details>
             </div>
         </div>
    `;

    const getPolicyHTML = () => `
        <div>
            <h3 class="text-2xl font-bold mb-4 text-center google-sans">Kebijakan & Ketentuan</h3>
            <div class="grid md:grid-cols-1 gap-6 text-sm text-m3-on-surface-variant">
                <div class="mb-6">
                    <h4 class="text-lg font-bold mb-3 google-sans">Kebijakan Privasi</h4>
                    <p class="mb-4 text-sm leading-relaxed">Informasi yang Anda berikan (alamat email Google) hanya digunakan untuk keperluan upgrade dan komunikasi terkait pesanan. Kami <strong>tidak pernah</strong> meminta atau menyimpan kata sandi Anda. Semua file Anda tetap sepenuhnya pribadi di bawah kendali Anda dan kebijakan Google.</p>
                    <ul class="list-disc list-inside space-y-2 text-sm">
                        <li>Kami hanya butuh email, bukan password.</li>
                        <li>Informasi pembayaran diproses oleh gateway aman.</li>
                        <li>Data Anda tidak dibagikan ke pihak lain.</li>
                        <li>Kami tidak mengakses file di dalam Drive Anda.</li>
                    </ul>
                </div>
                <div>
                    <h4 class="text-lg font-bold mb-3 google-sans">Syarat & Ketentuan</h4>
                     <p class="mb-4 text-sm leading-relaxed">Dengan menggunakan layanan ini, Anda setuju untuk terikat pada S&K kami. Layanan ini adalah pembayaran satu kali untuk manfaat seumur hidup, tunduk pada kebijakan Google yang berlaku.</p>
                    <ul class="list-disc list-inside space-y-2 text-sm">
                        <li>Layanan untuk penggunaan wajar dan tidak melanggar hukum.</li>
                        <li>Garansi penuh jika upgrade gagal karena kesalahan kami.</li>
                        <li>Garansi tidak mencakup pemblokiran akun akibat pelanggaran oleh pengguna.</li>
                        <li>Perubahan kebijakan Google di masa depan berada di luar kendali kami.</li>
                    </ul>
                </div>
            </div>
        </div>
    `;

    // --- FUNCTIONS ---
    function formatCurrency(value) {
        return `Rp${value.toLocaleString('id-ID', { minimumFractionDigits: 0 })}`;
    }

    function getIndonesianTimezone() {
        const offset = new Date().getTimezoneOffset() / -60;
        if (offset === 7) return 'WIB';
        if (offset === 8) return 'WITA';
        if (offset === 9) return 'WIT';
        const sign = offset > 0 ? '+' : '-';
        const hours = Math.abs(Math.floor(offset));
        return `GMT${sign}${String(hours).padStart(2, '0')}:00`;
    }

    function updateDisplay() {
        const pkg = packages[currentPackageId];
        const totalPrice = pkg.price + uniqueCode;

        const infoContainer = elements.productInfoFormTop;
        const featuresContainer = elements.featuresBeforeForm;

        // 1. Start fade-out
        infoContainer.style.opacity = '0';
        featuresContainer.style.opacity = '0';

        // 2. Wait for fade-out to finish, then update content and fade-in
        setTimeout(() => {
            // Update the HTML for the transitioning parts
            infoContainer.innerHTML = getProductInfoHTML(pkg);
            featuresContainer.innerHTML = getFeaturesHTML(pkg);

            // Update other parts that don't need transition
            elements.paymentMethodSelection.innerHTML = getPaymentMethodsHTML(paymentAccounts);
            elements.orderDetailsInForm.innerHTML = getOrderDetailsHTML(pkg, totalPrice);
            elements.testimonialsFull.innerHTML = getTestimonialsHTML(pkg);
            elements.faqFull.innerHTML = getFaqHTML();
            elements.policyFull.innerHTML = getPolicyHTML();

            // 3. Start fade-in
            infoContainer.style.opacity = '1';
            featuresContainer.style.opacity = '1';
        }, 300); // Match CSS transition duration
    }

    function generateWaLink(formData, pkg, totalPrice, paymentMethodName, paymentId) {
        const detailPesanan = `*Email Google:* ${formData.get('email')}\n`;
        const pesanWA = `Halo, saya ingin konfirmasi pembayaran untuk pesanan:\n\n` +
                      `*ID Pembayaran:* ${paymentId}\n` +
                      `*Paket:* ${pkg.name}\n` +
                      `*Metode Pembayaran:* ${paymentMethodName}\n` +
                      `*Nama:* ${formData.get('nama')}\n` +
                      `*No. WhatsApp:* ${formData.get('whatsapp')}\n` +
                      detailPesanan +
                      `*Total Transfer:* ${formatCurrency(totalPrice)}\n\n` +
                      `Saya sudah melakukan transfer. Mohon untuk segera diproses. Terima kasih.`;
        return `https://wa.me/6285602152097?text=${encodeURIComponent(pesanWA)}`;
    }

    function showPaymentInstructions(formData, pkg, totalPrice, paymentAccount, paymentId, paymentMethodKey) {
        window.scrollTo(0, 0); // Scroll to top

        // --- FB Pixel Event Removed ---

        // Store details for the modal
        currentOrderDetails = {
            pkg,
            totalPrice,
            paymentId,
            nama: formData.get('nama'),
            whatsapp: formData.get('whatsapp')
        };


        elements.mainContentContainer.parentElement.style.display = 'none';
        elements.footer.style.display = 'none';

        const waLink = generateWaLink(formData, pkg, totalPrice, paymentAccount.displayName, paymentId);

        let accountLabel = 'Nomor Virtual Account';
        let instructionAccordionHTML = '';
        let paymentDetailsBlock = '';
        let paymentDeadlineFormatted = '';

        // Set expiry time (e.g., 24 hours from now)
        expiryTime = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);

        const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const datePart = expiryTime.toLocaleDateString('id-ID', dateOptions);
        const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
        const timePart = expiryTime.toLocaleTimeString('id-ID', timeOptions).replace(/\./g, ':');
        const timezoneString = `(${getIndonesianTimezone()})`;
        paymentDeadlineFormatted = `${datePart} pukul ${timePart} ${timezoneString}`;


        if (paymentMethodKey === 'qris') {
            paymentDetailsBlock = `
                <div class="text-center">
                    <div id="qrcodeContainer" class="bg-white p-3 rounded-xl border-2 border-gray-200 w-full max-w-[250px] h-auto mx-auto my-4 material-card-elevated">
                        <div id="qrcode" class="flex justify-center items-center"></div>
                    </div>
                    <button id="downloadQrisButton" class="cta-button blue-button max-w-xs mx-auto">
                        <i class="fas fa-download mr-2"></i>
                        Unduh QRIS
                    </button>
                    <p class="text-center text-xs text-gray-600 mt-3">Pindai QR Code di atas menggunakan aplikasi perbankan atau e-wallet Anda.</p>
                </div>
            `;
        } else {
             paymentDetailsBlock = `
                <div class="mt-4">
                    <p class="text-xs text-gray-500 mb-1">${accountLabel}</p>
                    <div class="flex justify-between items-center bg-gray-50 p-3 rounded-lg">
                        <p class="text-xl font-bold text-gray-800 tracking-wider google-sans">${paymentAccount.number}</p>
                        <button onclick="copyToClipboard('${paymentAccount.number}', '${accountLabel}')" class="copy-button-text">
                            <i class="far fa-copy mr-1"></i>
                            Salin
                        </button>
                    </div>
                </div>
            `;
        }

        // --- UPDATED: Detailed Payment Instructions ---
        switch (paymentMethodKey) {
            case 'qris':
                instructionAccordionHTML = `
                    <details class="payment-accordion" open><summary>Cara Bayar via QRIS</summary><div class="payment-accordion-content"><ol class="space-y-3">
                        <li>Buka aplikasi perbankan (m-banking) atau e-wallet Anda (GoPay, OVO, DANA, dll).</li>
                        <li>Pilih menu <strong>Bayar</strong>, <strong>Scan QR</strong>, atau <strong>QRIS</strong>.</li>
                        <li>Pindai (scan) kode QR yang ditampilkan di atas.</li>
                        <li>Pastikan nama merchant dan nominal pembayaran sudah sesuai.</li>
                        <li>Masukkan PIN Anda untuk menyelesaikan transaksi.</li>
                        <li>Simpan bukti pembayaran.</li>
                    </ol></div></details>
                `;
                break;
            case 'bca_va':
                instructionAccordionHTML = `
                    <details class="payment-accordion"><summary>myBCA</summary><div class="payment-accordion-content"><ol class="space-y-2">
                        <li>Buka aplikasi myBCA dan login.</li>
                        <li>Pilih menu <strong>Transfer</strong>, lalu pilih <strong>Virtual Account</strong>.</li>
                        <li>Pilih <strong>Tujuan Baru</strong>.</li>
                        <li>Masukkan nomor Virtual Account: <strong>${paymentAccount.number}</strong>.</li>
                        <li>Pilih sumber dana yang akan digunakan.</li>
                        <li>Masukkan nominal jika diminta.</li>
                        <li>Periksa detail transaksi, lalu tekan <strong>Lanjut</strong>.</li>
                        <li>Masukkan PIN untuk menyelesaikan transaksi.</li>
                    </ol></div></details>
                    <details class="payment-accordion"><summary>BCA Mobile</summary><div class="payment-accordion-content"><ol class="space-y-2">
                        <li>Buka aplikasi BCA Mobile dan login.</li>
                        <li>Pilih menu <strong>m-Transfer</strong>, lalu pilih <strong>BCA Virtual Account</strong>.</li>
                        <li>Masukkan nomor <strong>${paymentAccount.number}</strong>.</li>
                        <li>Masukkan nominal jika diminta.</li>
                        <li>Periksa nama penerima, lalu tekan <strong>OK</strong>.</li>
                        <li>Masukkan PIN m-BCA untuk menyelesaikan transaksi.</li>
                    </ol></div></details>
                    <details class="payment-accordion"><summary>KlikBCA</summary><div class="payment-accordion-content"><ol class="space-y-2">
                        <li>Buka situs KlikBCA dan login.</li>
                        <li>Pilih menu <strong>Transfer Dana</strong>, lalu pilih <strong>Transfer ke BCA Virtual Account</strong>.</li>
                        <li>Masukkan nomor <strong>${paymentAccount.number}</strong>.</li>
                        <li>Masukkan nominal transfer.</li>
                        <li>Tekan <strong>Lanjutkan</strong>, lalu masukkan kode KeyBCA Appli 1.</li>
                        <li>Tekan <strong>Kirim</strong> untuk menyelesaikan transaksi.</li>
                    </ol></div></details>
                    <details class="payment-accordion"><summary>ATM BCA</summary><div class="payment-accordion-content"><ol class="space-y-2">
                       <li>Masukkan kartu ATM BCA dan PIN.</li>
                       <li>Pilih menu <strong>Transaksi Lainnya</strong>.</li>
                       <li>Pilih <strong>Transfer</strong>.</li>
                       <li>Pilih <strong>Ke Rekening BCA Virtual Account</strong>.</li>
                       <li>Masukkan nomor <strong>${paymentAccount.number}</strong>.</li>
                       <li>Masukkan nominal jika diminta, lalu konfirmasi.</li>
                    </ol></div></details>
                `;
                break;
            case 'cimb':
                instructionAccordionHTML = `
                    <details class="payment-accordion"><summary>OCTO Mobile</summary><div class="payment-accordion-content"><ol class="space-y-2">
                        <li>Buka aplikasi OCTO Mobile dan login.</li>
                        <li>Pilih menu <strong>Transfer</strong>, lalu pilih <strong>Rekening CIMB Niaga</strong>.</li>
                        <li>Masukkan nomor rekening <strong>${paymentAccount.number}</strong>.</li>
                        <li>Pilih sumber dana yang akan digunakan.</li>
                        <li>Tekan <strong>Next</strong>.</li>
                        <li>Periksa nama penerima dan jumlah nominal.</li>
                        <li>Tekan <strong>Konfirmasi</strong>, lalu masukkan dua digit PIN acak yang diminta.</li>
                    </ol></div></details>
                    <details class="payment-accordion"><summary>Transfer dari Bank Lain</summary><div class="payment-accordion-content"><ol class="space-y-2">
                        <li>Buka aplikasi mobile banking bank pengirim dan login.</li>
                        <li>Pilih menu <strong>Transfer Antar Bank</strong> atau <strong>Transfer ke Bank Lain</strong>.</li>
                        <li>Pilih bank tujuan <strong>CIMB Niaga</strong> dengan kode bank <strong>022</strong>.</li>
                        <li>Masukkan nomor rekening <strong>${paymentAccount.number}</strong>.</li>
                        <li>Masukkan nominal transfer sesuai kebutuhan.</li>
                        <li>Periksa nama penerima, lalu konfirmasi.</li>
                        <li>Masukkan PIN atau kode otentikasi untuk menyelesaikan transaksi.</li>
                    </ol></div></details>
                `;
                break;
            case 'gopay':
                instructionAccordionHTML = `
                    <details class="payment-accordion"><summary>Aplikasi Gojek (GoPay)</summary><div class="payment-accordion-content"><ol class="space-y-2">
                        <li>Buka aplikasi Gojek dan login.</li>
                        <li>Tekan menu <strong>Bayar</strong> atau <strong>Transfer</strong>.</li>
                        <li>Pilih <strong>Ke Sesama GoPay</strong> atau <strong>Transfer ke Orang Lain</strong>.</li>
                        <li>Masukkan nomor <strong>${paymentAccount.number}</strong>.</li>
                        <li>Masukkan nominal yang akan dikirim.</li>
                        <li>Periksa nama penerima, lalu tekan <strong>Konfirmasi & Bayar</strong>.</li>
                        <li>Masukkan PIN GoPay untuk menyelesaikan transfer.</li>
                    </ol></div></details>
                `;
                break;
            case 'dana':
                instructionAccordionHTML = `
                    <details class="payment-accordion"><summary>Aplikasi DANA</summary><div class="payment-accordion-content"><ol class="space-y-2">
                        <li>Buka aplikasi DANA dan login.</li>
                        <li>Tekan menu <strong>Kirim</strong>.</li>
                        <li>Pilih <strong>Kirim ke Nomor HP</strong>.</li>
                        <li>Masukkan nomor <strong>${paymentAccount.number}</strong>.</li>
                        <li>Tekan <strong>Lanjut</strong>.</li>
                        <li>Masukkan nominal yang akan dikirim.</li>
                        <li>Pilih sumber dana yang tersedia.</li>
                        <li>Tekan <strong>Kirim Dana</strong>.</li>
                        <li>Masukkan PIN DANA untuk menyelesaikan transaksi.</li>
                    </ol></div></details>
                `;
                break;
            case 'ovo':
                instructionAccordionHTML = `
                    <details class="payment-accordion"><summary>Aplikasi OVO</summary><div class="payment-accordion-content"><ol class="space-y-2">
                        <li>Buka aplikasi OVO dan login.</li>
                        <li>Pilih menu <strong>Transfer</strong>.</li>
                        <li>Pilih <strong>Ke Sesama OVO</strong>.</li>
                        <li>Masukkan nomor <strong>${paymentAccount.number}</strong>.</li>
                        <li>Masukkan nominal transfer.</li>
                        <li>Tekan <strong>Lanjutkan</strong>.</li>
                        <li>Periksa nama penerima.</li>
                        <li>Tekan <strong>Transfer</strong> untuk menyelesaikan pengiriman dana.</li>
                    </ol></div></details>
                `;
                break;
            default:
                 instructionAccordionHTML = `
                    <details class="payment-accordion"><summary>Instruksi Umum</summary><div class="payment-accordion-content"><ol class="space-y-2">
                        <li>Buka aplikasi perbankan atau e-wallet Anda.</li>
                        <li>Pilih menu transfer atau pembayaran.</li>
                        <li>Masukkan detail pembayaran yang tertera di atas.</li>
                        <li>Pastikan nominal transfer sesuai dengan total pembayaran hingga digit terakhir.</li>
                        <li>Selesaikan transaksi dan simpan bukti pembayaran Anda.</li>
                    </ol></div></details>
                  `;
        }

        const paymentViewHTML = `
            <div class="payment-header">
                <h2 class="google-sans">Selesaikan Pembayaran</h2>
                <div class="countdown-timer" id="countdown-timer-display"></div>
            </div>
            <div class="max-w-lg mx-auto">
                <div class="p-2 sm:p-4">
                    <div class="payment-card">
                        <h3 class="font-bold text-lg google-sans mb-1">Ringkasan Transaksi</h3>
                        <div class="flex justify-between items-center mt-2 text-xs text-gray-600">
                            <span>Nomor Invoice: <strong>${paymentId}</strong></span>
                            <a href="#" onclick="showDetailsModal(event)" class="font-semibold text-google-blue">Lihat detail</a>
                        </div>
                        <hr class="my-4">
                        <p class="text-xs text-gray-600 mb-1">Total Pembayaran</p>
                        <div class="flex items-center justify-between">
                            <p class="text-2xl font-bold text-google-blue google-sans">${formatCurrency(totalPrice)}</p>
                            <button onclick="copyToClipboard('${totalPrice}', 'Total Pembayaran')" class="copy-button-text">
                                <i class="far fa-copy mr-1"></i>
                                Salin
                            </button>
                        </div>
                    </div>
                    <div class="payment-card">
                        <h3 class="font-bold text-lg google-sans mb-3">Silahkan Bayar ke</h3>
                        <div class="flex justify-between items-start mt-3">
                            <div>
                                <p class="text-sm text-gray-500">${paymentAccount.displayName}</p>
                                <p class="font-semibold text-gray-800 text-md">${paymentAccount.accountHolder}</p>
                            </div>
                            <img src="${paymentAccount.logo}" alt="Logo ${paymentAccount.displayName}" class="h-8">
                        </div>
                        ${paymentDetailsBlock}
                        <div class="mt-6">
                            <p class="text-xs text-gray-500 mb-1">Bayar Sebelum</p>
                            <p class="font-semibold text-gray-800 text-sm">${paymentDeadlineFormatted}</p>
                        </div>
                        <a href="${waLink}" target="_blank" class="block mt-6">
                           <button class="confirm-button-outlined">
                               <i class="fab fa-whatsapp mr-2"></i>
                               Konfirmasi Pembayaran
                           </button>
                        </a>
                    </div>
                    <div class="payment-card">
                        <h3 class="font-bold text-lg google-sans mb-2">Cara Membayar</h3>
                        <div class="mt-2">
                            ${instructionAccordionHTML}
                        </div>
                    </div>
                </div>
            </div>
        `;
        elements.paymentInstructionContainer.innerHTML = paymentViewHTML;
        startCountdown();

        // Generate QR Code if applicable
        if (paymentMethodKey === 'qris') {
            setTimeout(() => {
                const qrcodeContainer = document.getElementById('qrcode');
                if(qrcodeContainer) {
                    try {
                        const qrisStatic = paymentAccount.number;
                        const qrisDinamis = createDynamicQrisString(qrisStatic, { nominal: totalPrice });
                        qrcodeContainer.innerHTML = ''; // Clear previous QR
                        QRCode.toCanvas(qrisDinamis, {
                            width: 250, margin: 1, errorCorrectionLevel: 'H'
                        }, (err, canvas) => {
                            if (err) { throw err; }
                            canvas.style.width = "100%";
                            canvas.style.height = "auto";
                            canvas.style.borderRadius = "8px";
                            qrcodeContainer.appendChild(canvas);

                            // Add download functionality
                            document.getElementById('downloadQrisButton').addEventListener('click', () => {
                                const link = document.createElement('a');
                                link.download = `QRIS-${paymentId}.png`;
                                link.href = canvas.toDataURL("image/png");
                                link.click();
                            });
                        });
                    } catch (e) {
                        console.error("QRIS Generation Error:", e.message);
                        qrcodeContainer.innerHTML = `<p class="text-red-500 text-sm">Gagal membuat QR Code dinamis. Silakan coba lagi atau hubungi support.</p>`;
                    }
                }
            }, 100);
        }
    }

    async function handleFormSubmit() {
        // 1. Validate Form
        const formData = new FormData(elements.orderForm);
        const nama = formData.get('nama').trim();
        const whatsapp = formData.get('whatsapp').trim();
        const email = formData.get('email').trim();
        const paymentMethodKey = formData.get('payment-method');

        if (!nama || !whatsapp || !email || !paymentMethodKey) {
            showInfoModal('Data Belum Lengkap', 'Mohon lengkapi semua data yang diperlukan sebelum melanjutkan.');
            return;
        }

        // --- New Validation Rules ---
        if (!email.endsWith('@gmail.com')) {
            showInfoModal('Email Tidak Valid', 'Harap gunakan alamat email Gmail yang valid (diakhiri dengan @gmail.com).');
            return;
        }

        const phoneValidationResult = validatePhoneNumber(whatsapp);
        if (!phoneValidationResult.isValid) {
            showInfoModal('Nomor WhatsApp Tidak Valid', phoneValidationResult.message);
            return;
        }

        // 2. Set Loading State
        elements.submitBtn.disabled = true;
        elements.submitBtn.innerHTML = '<i class="fas fa-spinner spinner mr-2"></i> Memproses...';

        // 3. Prepare Data
        const pkg = packages[currentPackageId];
        const totalPrice = pkg.price + uniqueCode;
        const paymentAccount = paymentAccounts[paymentMethodKey];
        const now = new Date();
        const paymentId = `INV-${pkg.id.toUpperCase()}-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}${String(totalPrice).slice(-3)}`;

        // 4. Submit to Static Forms
        let submissionSuccess = false;
        try {
            // Construct the follow-up message with bolding
            let followUpMessage = `Halo kak ${nama},\n\nTerima kasih telah memesan *${pkg.name}*.\n\nBerikut adalah rincian pembayaran untuk pesanan Anda:\n- Nomor Invoice: ${paymentId}\n- Total Pembayaran: *${formatCurrency(totalPrice)}*\n\nMohon segera selesaikan pembayaran Anda.\n`;

            if (paymentMethodKey === 'qris') {
                followUpMessage += `*- Metode:* ${paymentAccount.displayName}\nSilakan pindai QRIS yang muncul di halaman pembayaran.\n`;
            } else {
                followUpMessage += `*- Metode:* ${paymentAccount.displayName}\n*- Nomor:* ${paymentAccount.number}` + (paymentAccount.accountHolder ? `\n*- Atas Nama:* ${paymentAccount.accountHolder}` : ``) + `\n`;
            }

            followUpMessage += `\n*Penting:* Mohon transfer sesuai dengan jumlah total di atas (termasuk kode unik) agar pesanan Anda dapat kami proses secara otomatis.\n\nSetelah transfer, silakan klik tombol konfirmasi di halaman pembayaran atau balas pesan ini.\n\nTerima kasih`;

            // Format WhatsApp number
            const formattedWhatsapp = whatsapp.startsWith('0') ? '62' + whatsapp.substring(1) : whatsapp;
            const followUpLink = `https://wa.me/${formattedWhatsapp}?text=${encodeURIComponent(followUpMessage)}`;

            const formDataForStaticForms = {
                apiKey: 'sf_195b5fj92dge8l9b391mng1g',
                replyTo: email,
                honeypot: formData.get('honeypot'),
                name: nama,
                email: email,
                whatsapp: whatsapp,
                '$Nomor Invoice': paymentId,
                '$Paket': pkg.name,
                '$Metode Pembayaran': paymentAccount.displayName,
                '$Total Transfer': formatCurrency(totalPrice),
                '$Link Follow Up WA': followUpLink // Add the follow-up link
            };

            const response = await fetch('https://api.staticforms.xyz/submit', {
                method: 'POST',
                body: JSON.stringify(formDataForStaticForms),
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.ok) {
                submissionSuccess = true;
            } else {
                console.error("Static Forms server error:", response.status, await response.text());
            }

        } catch (e) {
            console.error("Network error during form submission:", e);
        }

        // 5. Restore Button State
        elements.submitBtn.disabled = false;
        elements.submitBtn.innerHTML = '<i class="fas fa-shopping-cart mr-2"></i> Beli Sekarang';

        // 6. Update UI based on submission result
        if (submissionSuccess) {
            showPaymentInstructions(formData, pkg, totalPrice, paymentAccount, paymentId, paymentMethodKey);
        } else {
            showInfoModal('Pengiriman Gagal', 'Maaf, terjadi kesalahan saat mengirim data Anda. Silakan coba lagi.');
        }
    }

    // --- NEW: Countdown Timer Function ---
    function startCountdown() {
        const countdownElement = document.getElementById('countdown-timer-display');
        if (!countdownElement || !expiryTime) return;

        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = expiryTime - now;

            if (distance < 0) {
                clearInterval(interval);
                countdownElement.innerHTML = "Waktu Habis";
                return;
            }

            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            countdownElement.innerHTML = `
                <div class="countdown-item">
                    <span class="countdown-number">${String(hours).padStart(2, '0')}</span> Jam
                </div>
                <div class="countdown-item">
                    <span class="countdown-number">${String(minutes).padStart(2, '0')}</span> Menit
                </div>
                <div class="countdown-item">
                    <span class="countdown-number">${String(seconds).padStart(2, '0')}</span> Detik
                </div>
            `;
        }, 1000);
    }

    // --- NOTIFICATION FUNCTIONS ---
    const FIRST_NAMES = [ "Budi Santoso", "Ayu", "Rahmat", "Citra Dewi Kusuma", "Bayu Pratama", "Lina", "Wulan", "Adi", "Farhan Syahputra", "Hendra Wijaya", "Nana Puspita Dewi", "Joko", "Mega Sari", "Gilang Pramana Putra", "Sari", "Dedi", "Eka Suryani", "Teguh", "Putri Lestari Ayu", "Andi", "Bagus Wijaya", "Ilham Saputra Nugraha", "Rizal", "Mira Astuti", "Puspita", "Hari", "Tri Saputra", "Cahya Pratama", "Surya Darmawan Putra", "Wahyu Ramadhan", "Agus", "Indra Permana", "Linda", "Fajar Mahendra Saputra", "Yusuf", "Pramono Adi Nugroho", "Sinta Dewi", "Bima Pratama", "Dian", "Hasan Basri", "Nurul Aini", "Arif Budiman", "Feri", "Lukman Hakim", "Rangga", "Rini Anggraini Putri", "Tono", "Hadi Prasetyo", "Elisa Purnama", "Anisa Rahma", "Gunawan", "Melati", "Bagus Prasetyo Ramadhan", "Septi Amelia", "Cindy Amelia", "Windi Saputri", "Galih Pratama", "Evi", "Putra", "Slamet Riyadi", "Latif Hidayat", "Gita Puspita", "Darmawan", "Maya", "Erik Saputra Pratama", "Jani", "Jefri Maulana", "Bella Sari", "Maulana", "Novi Andriana Lestari", "Fajar Nugroho", "Taufik Hidayat", "Prasetyo", "Samsul", "Agung", "Endang", "Indah", "Hana Pertiwi", "Mirna", "Yulia", "Panca", "Niken", "Rio", "Adi Putra Ramadhan", "Ganda", "Wahida", "Robby Saputra", "Halim", "Firman Saputra", "Berlian Putra", "Ari", "Joko Setiawan", "Mustika", "Bahar", "Mega", "Erlangga", "Sofyan", "Doni", "Fatimah", "Dian Purnama Sari", "Rama", "Imam Saputra", "Johan", "Gusman", "Lintang", "Nabila", "Beni", "Purnama", "Murni", "Malik", "Nurlan", "Doni Saputra", "Lastri", "Berlinda", "Rasyid", "Tari", "Nia", "Tirta", "Juli Andriani", "Lutfi", "Suci", "Arman", "Yani", "Citra Ayu", "Harto", "Rangga Pratama", "Febrina", "Indra Gunawan Saputra", "Tomi", "Sutrisno", "Risma", "Jihan Ayu Pratiwi", "Lestari", "Dewi Kusuma", "Fahmi", "Rifki", "Wira", "Putra Wijaya", "Beni Setiawan", "Asep", "Gerry", "Prasetia", "Euis", "Latif", "Pajar", "Rahmat Hidayat", "Rudi", "Tika", "Danu", "Hesti", "Syahrul", "Anwar", "Miranti", "Nuraini", "Nurman", "Eman Kurnia", "Nirmala", "Hari Susanto", "Taufan", "Tono Prabowo", "Bayu Saputra Nugroho", "Darma", "Nurlaila", "Hafid", "Mustofa", "Elok", "Gunarto", "Novi", "Lasman", "Jamaludin", "Andi Wijaya Putra", "Herman", "Mila", "Wibowo", "Prayitno", "Adi Saputra", "Jamal", "Irfan", "Iskandar", "Yudha", "Lutris", "Samsul Hidayat", "Heru", "Bagus", "Rudianto", "Nanda Putri", "Laila Rahma", "Frans", "Hilda", "Cahya", "Rudi Pratama", "Setiawan", "Rangga Saputra", "Puspa", "Doni Prasetyo", "Nurul", "Febri", "Mega Sari Lestari", "Suyatno", "Tomiadi", "Fikri", "Lani", "Intan", "Johan Saputra", "Iwan", "Berliano", "Ilham", "Teddy", "Lani Puspita", "Eka Putri Andayani", "Hani", "Adi Wijaya", "Adit", "Dicky", "Gopal", "Pramono", "Gunadi", "Gilang", "Joko Prayitno Adi", "Mira", "Puspita Sari", "Maulana Hakim", "Putri Ayu Lestari", "Malik Prasetyo", "Toriq", "Joni", "Gilang Pratama", "Bagus Wijaya Putra", "Berlian", "Wandi", "Nurman Saputra", "Fajarudin", "Lutfi Pratama", "Citra", "Nanda", "Laras", "Tuti", "Yani Pratiwi", "Gusman Saputra", "Rangga Putra", "Prasetiawan", "Ismail", "Heri", "Adi Nugroho", "Putri", "Prasetyo Adi", "Dona", "Gani", "Jihan", "Puspita Dewi", "Rizal Maulana", "Mahendra", "Ayu Pratiwi", "Rangga Setiawan", "Lina Sari", "Fani", "Adi Wijaya Putra", "Sari Melati", "Andri", "Bima", "Teguh Santoso Adi", "Fajar", "Wulan Dewi", "Rama Pratama", "Nana", "Farhan", "Dion", "Melati Pertiwi", "Adi Putra", "Joko Santoso", "Doni Setiawan", "Lintang Pertiwi", "Septi", "Gopal Pramana", "Tomi Pratama", "Rio Nugraha", "Cindy", "Hafid Saputra", "Hendra", "Niken Lestari", "Rangga Nugroho", "Putri Ayu", "Sofyan Hidayat", "Robby", "Bima Saputra", "Indra", "Adi Kurniawan", "Nanda Saputra", "Gilang Saputra", "Wahyu", "Puspita Ayu", "Rudi Hartono", "Wulan Dewi Pertiwi", "Ayu Pratiwi Lestari", "Tono Adi", "Dedi Kurniawan", "Prasetyo Ramadhan", "Adi Setiawan", "Mira Lestari", "Farhan Syahputra Adi", "Nurul Hidayah", "Sari Anggraini", "Bayu", "Eman", "Putra Adi Nugroho", "Lestari Ayu", "Bambang", "Rangga Hidayat", "Mega Putri", "Adi Nugraha", "Anisa", "Siska", "Wandi Putra", "Fajar Saputra", "Gunawan Pratama", "Heri Setiawan", "Arif", "Ilham Nugroho", "Bagus Pratama", "Erlangga Putra", "Rian", "Pandu", "Tari Ayu", "Hendro", "Risma Ayu", "Adi Pratama", "Septi Ayu", "Bambang Santoso", "Lukman", "Gani Saputra", "Hasan", "Feri Kurniawan", "Tirta", "Bambang Prasetyo", "Pajar Saputra", "Arman Putra", "Murni Ayu", "Hafiz", "Euis Sari", "Bayu Nugroho", "Tomi Saputra", "Gerry Pratama", "Arif Prasetyo", "Johan Putra", "Hafid Nugraha", "Nabila Pertiwi", "Latif Saputra", "Ari Saputra", "Rio Saputra", "Tono Saputra", "Wandi Saputra", "Mahendra Putra", "Ilham Pratama", "Putri Dewi", "Adi Lestari", "Rangga Maulana", "Bayu Hidayat", "Fani Puspita", "Taufik", "Bagus Saputra", "Novi Puspita", "Rahmat Hidayatullah Putra", "Prayitno Saputra", "Adi Ramadhan", "Bayu Wijaya", "Gilang Nugraha", "Rangga Prasetyo", "Putra Purnama", "Wulan Pertiwi", "Adi Wijaya Ramadhan", "Budi", "Rian Pratama", "Samsul Nugroho", "Wahyu Saputra", "Teguh Prasetyo", "Fikri Nugraha", "Rizki Pratama" ];

    function getRandomElement(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
    function generateRandomName() { return `${getRandomElement(FIRST_NAMES)}`; }

    function showNextNotification() {
        if (!elements.notifBox || !elements.notifName) return;
        elements.notifName.textContent = generateRandomName();
        elements.notifBox.classList.remove('show');
        void elements.notifBox.offsetWidth; // Trigger reflow
        elements.notifBox.classList.add('show');
    }

    function scheduleNextNotification() {
        const randomDelay = Math.floor(Math.random() * 10000) + 8000;
        setTimeout(() => {
            showNextNotification();
            scheduleNextNotification();
        }, randomDelay);
    }

    // --- INITIALIZATION ---
    elements.currentYear.textContent = new Date().getFullYear();
    elements.submitBtn.addEventListener('click', handleFormSubmit);

    document.querySelectorAll('input[name="package"]').forEach(radio => {
        radio.addEventListener('change', (event) => {
            currentPackageId = event.target.value;
            updateDisplay();
        });
    });

    updateDisplay();

    if (elements.notifBox && elements.notifName) {
        setTimeout(scheduleNextNotification, 6000);
    }

    // --- REVISED: DETAILS MODAL LOGIC ---
    function getDetailsModalHTML(details) {
        const { pkg, totalPrice, paymentId, nama, whatsapp } = details;
        return `
            <div class="details-modal-header">
                <h3>Ringkasan Transaksi</h3>
                <button class="details-modal-close" onclick="closeDetailsModal()">&times;</button>
            </div>
            <div class="details-modal-body">
                <p class="text-sm text-gray-500 mb-6">Nomor Invoice: <strong>${paymentId}</strong></p>
                <div class="text-center mb-8">
                    <p class="text-sm text-gray-600 mb-2">Total Pembayaran</p>
                    <div class="flex items-center justify-center">
                        <p class="text-4xl font-bold text-google-blue google-sans">${formatCurrency(totalPrice)}</p>
                        <button onclick="copyToClipboard('${totalPrice}', 'Total Pembayaran')" class="copy-button-text">
                            <i class="far fa-copy"></i>
                        </button>
                    </div>
                </div>
                <div class="space-y-4 border-t border-b border-gray-200 py-6 mb-6">
                    <div>
                        <div class="flex justify-between text-base">
                            <span>${pkg.name}</span>
                            <span class="font-semibold text-gray-800">${formatCurrency(pkg.price)}</span>
                        </div>
                        <div class="flex justify-between text-sm text-gray-500 mt-1">
                            <span>1x ${formatCurrency(pkg.price)}</span>
                        </div>
                    </div>
                     <div class="flex justify-between text-sm">
                        <span class="text-gray-500">Kode Unik</span>
                        <span class="font-medium">${formatCurrency(uniqueCode)}</span>
                    </div>
                </div>
                <div class="space-y-3 mb-8">
                    <div class="flex justify-between text-base">
                        <span class="text-gray-600">Subtotal</span>
                        <span>${formatCurrency(totalPrice)}</span>
                    </div>
                    <div class="flex justify-between font-bold text-xl google-sans">
                        <span>Total Pembayaran</span>
                        <span class="text-google-blue">${formatCurrency(totalPrice)}</span>
                    </div>
                </div>
                <div class="border-t border-gray-200 pt-6">
                    <h4 class="font-semibold mb-4 google-sans">Informasi Pelanggan</h4>
                    <div class="grid grid-cols-2 gap-6">
                        <div>
                            <p class="text-gray-500 text-sm mb-1">Nama</p>
                            <p class="font-medium">${nama}</p>
                        </div>
                        <div>
                            <p class="text-gray-500 text-sm mb-1">Nomor Telepon</p>
                            <p class="font-medium">${whatsapp}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    window.showDetailsModal = function(event) {
        event.preventDefault();
        elements.detailsModalContent.innerHTML = getDetailsModalHTML(currentOrderDetails);
        elements.detailsModal.style.display = 'flex';
        elements.detailsModalContent.classList.remove('is-closing');
        elements.detailsModalContent.classList.add('is-open');
    }

    window.closeDetailsModal = function() {
        elements.detailsModalContent.classList.remove('is-open');
        elements.detailsModalContent.classList.add('is-closing');
        setTimeout(() => {
            elements.detailsModal.style.display = 'none';
        }, 300); // Match animation duration
    }


});

// --- GLOBAL HELPER FUNCTIONS ---
const infoModal = document.getElementById('infoModal');

function showInfoModal(title, message) {
    if (!infoModal) return;
    infoModal.querySelector('#modalTitle').textContent = title;
    infoModal.querySelector('#modalMessage').textContent = message;
    infoModal.style.display = 'flex';
}

function closeInfoModal() {
    if (!infoModal) return;
    infoModal.style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == infoModal) { closeInfoModal(); }
    if (event.target == document.getElementById('detailsModal')) { closeDetailsModal(); }
    if (event.target == document.getElementById('imageModal')) { closeImageModal(); }
}

function copyToClipboard(text, entityName) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
        document.execCommand('copy');
        showInfoModal('Berhasil Disalin!', `${entityName} telah disalin ke clipboard.`);
    } catch (err) {
        showInfoModal('Gagal!', 'Gagal menyalin. Silakan coba secara manual.');
    }
    document.body.removeChild(textArea);
}

// --- UPDATED QRIS LOGIC ---
function toCRC16(input) {
    let crc = 0xFFFF;
    for (let i = 0; i < input.length; i++) {
        crc ^= input.charCodeAt(i) << 8;
        for (let j = 0; j < 8; j++) {
            crc = crc & 0x8000 ? (crc << 1) ^ 0x1021 : crc << 1;
        }
    }
    return (crc & 0xFFFF).toString(16).toUpperCase().padStart(4, '0');
}

function createDynamicQrisString(qris, { nominal }) {
    if (!qris) throw new Error('Parameter "qris" (string QRIS statis) dibutuhkan.');
    if (nominal === undefined) throw new Error('Parameter "nominal" dibutuhkan.');

    let qrisModified = qris.slice(0, -4).replace("010211", "010212");
    const nominalStr = String(Math.round(nominal));
    const amountLength = nominalStr.length < 10 ? "0" + nominalStr.length : nominalStr.length.toString();
    const amountPart = "54" + amountLength + nominalStr;

    if (!qrisModified.includes("5802ID")) {
        throw new Error("Format string QRIS tidak dikenali (tidak ditemukan '5802ID').");
    }

    let finalQris = qrisModified.replace("5802ID", amountPart + "5802ID");
    const crc = toCRC16(finalQris);

    return finalQris + crc;
}

// --- Image Modal Functions ---
const imageModal = document.getElementById('imageModal');
const modalImg = document.getElementById("modalImage");
let currentImageIndex;

window.openImageModal = function(event, index) {
    event.stopPropagation();
    imageModal.style.display = "flex"; // Gunakan flexbox untuk centering
    showImage(index);
}

window.closeImageModal = function() {
    imageModal.style.display = "none";
}

function showImage(index) {
    const testimonialImages = [
        "https://s6.imgcdn.dev/YIh45V.png",
        "https://s6.imgcdn.dev/YIhuYh.png",
        "https://s6.imgcdn.dev/YIhCOK.png",
        "https://s6.imgcdn.dev/YIhIgo.png",
        "https://s6.imgcdn.dev/YIhQQO.png",
        "https://s6.imgcdn.dev/YIhiSn.png",
        "https://s6.imgcdn.dev/YIhkeg.png",
        "https://s6.imgcdn.dev/YIhscv.png",
        "https://s6.imgcdn.dev/YIhyaN.png",
        "https://s6.imgcdn.dev/YIh5tq.png",
        "https://s6.imgcdn.dev/YIhPYB.png",
        "https://s6.imgcdn.dev/YIhTKu.png"
    ];
    if (index >= testimonialImages.length || index < 0) {
        return; // Keluar jika index di luar batas
    }
    currentImageIndex = index;
    modalImg.src = testimonialImages[index];

    // Perbarui visibilitas tombol navigasi
    document.querySelector('.modal-nav.prev').style.display = (index > 0) ? 'flex' : 'none';
    document.querySelector('.modal-nav.next').style.display = (index < testimonialImages.length - 1) ? 'flex' : 'none';
}

window.showNextImage = function() {
    showImage(currentImageIndex + 1);
}

window.showPrevImage = function() {
    showImage(currentImageIndex - 1);
}

document.addEventListener('keydown', function(event) {
    if (imageModal.style.display === 'flex') {
        if (event.key === 'ArrowRight') {
            showNextImage();
        } else if (event.key === 'ArrowLeft') {
            showPrevImage();
        } else if (event.key === 'Escape') {
            closeImageModal();
        }
    }
});
