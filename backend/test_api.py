import sys
sys.modules['pyarrow'] = None
from fastapi.testclient import TestClient
from app.main import app

def run_tests():
    with TestClient(app) as client:
        r_root = client.get('/')
        print('1. GET / ->', r_root.status_code, r_root.json())

        r_dosen = client.get('/api/dosen')
        print('2. GET /api/dosen ->', r_dosen.status_code, 'Total dosen:', len(r_dosen.json()))

        r_rec = client.post('/api/recommend', json={'judul': 'Pembangunan Aplikasi Web GIS Pemetaan Sejarah Minangkabau Berbasis Leaflet'})
        print('3. POST /api/recommend ->', r_rec.status_code)
        data = r_rec.json()
        print('   Input:', data['judul_input'])
        print('   Query tokens:', data['kata_kunci_kueri'])
        for r in data['rekomendasi']:
            print(f"   #{r['peringkat']} {r['nama_dosen']} ({r['kode_kk']}) - TA: {r['jumlah_ta']}, Pub: {r['jumlah_publikasi']}, Matched: {r['kata_kunci_cocok']}")

        r_info = client.get('/api/info')
        print('4. GET /api/info ->', r_info.status_code, r_info.json())

        r_doc = client.get('/api/documents')
        print('5. GET /api/documents ->', r_doc.status_code, r_doc.json())

        # Test invalid short title (< 6 kata)
        r_bad = client.post('/api/recommend', json={'judul': 'Judul pendek saja'})
        print('6. Validation check (< 6 kata) -> Status:', r_bad.status_code, 'Detail:', r_bad.json()['detail'])

if __name__ == '__main__':
    run_tests()
