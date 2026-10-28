import os
import docx
from docx import Document
from docx.shared import Inches, Pt, RGBColor, Cm
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml import OxmlElement, parse_xml
from docx.oxml.ns import nsdecls, qn

def create_progress_report():
    doc = Document()

    # 1. Page Setup (A4, Margins: Top 3 cm, Bottom 3 cm, Right 3 cm, Left 4 cm)
    for section in doc.sections:
        section.page_width = Cm(21.0)
        section.page_height = Cm(29.7)
        section.top_margin = Cm(3.0)
        section.bottom_margin = Cm(3.0)
        section.left_margin = Cm(4.0)
        section.right_margin = Cm(3.0)

    # 2. Base Style Configurations
    style_normal = doc.styles['Normal']
    font_normal = style_normal.font
    font_normal.name = 'Times New Roman'
    font_normal.size = Pt(12)
    font_normal.color.rgb = RGBColor(0, 0, 0)
    style_normal.paragraph_format.line_spacing = 1.5
    style_normal.paragraph_format.space_before = Pt(0)
    style_normal.paragraph_format.space_after = Pt(0)

    # Helper: Add Heading 1 (BAB)
    def add_heading_1(text):
        p = doc.add_paragraph()
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p.paragraph_format.line_spacing = 1.5
        p.paragraph_format.space_before = Pt(0)
        p.paragraph_format.space_after = Pt(0)
        p.paragraph_format.first_line_indent = Cm(0)
        run = p.add_run(text.upper())
        run.bold = True
        run.font.name = 'Times New Roman'
        run.font.size = Pt(12)
        return p

    # Helper: Add Heading 2 (Sub-bab)
    def add_heading_2(text):
        p = doc.add_paragraph()
        p.alignment = WD_ALIGN_PARAGRAPH.LEFT
        p.paragraph_format.line_spacing = 1.5
        p.paragraph_format.space_before = Pt(0)
        p.paragraph_format.space_after = Pt(0)
        p.paragraph_format.first_line_indent = Cm(0)
        run = p.add_run(text)
        run.bold = True
        run.font.name = 'Times New Roman'
        run.font.size = Pt(12)
        return p

    # Helper: Add Heading 3 (Sub-sub-bab)
    def add_heading_3(text):
        p = doc.add_paragraph()
        p.alignment = WD_ALIGN_PARAGRAPH.LEFT
        p.paragraph_format.line_spacing = 1.5
        p.paragraph_format.space_before = Pt(0)
        p.paragraph_format.space_after = Pt(0)
        p.paragraph_format.first_line_indent = Cm(0)
        run = p.add_run(text)
        run.bold = True
        run.font.name = 'Times New Roman'
        run.font.size = Pt(12)
        return p

    # Helper: Add Body Paragraph (Justified with 1 cm indent)
    def add_body(text, indent=1.0):
        p = doc.add_paragraph()
        p.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
        p.paragraph_format.line_spacing = 1.5
        p.paragraph_format.space_before = Pt(0)
        p.paragraph_format.space_after = Pt(0)
        p.paragraph_format.first_line_indent = Cm(indent)
        run = p.add_run(text)
        run.font.name = 'Times New Roman'
        run.font.size = Pt(12)
        return p

    # Helper: Add Bullet Point
    def add_bullet(text, level=0):
        p = doc.add_paragraph()
        p.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
        p.paragraph_format.line_spacing = 1.5
        p.paragraph_format.space_before = Pt(0)
        p.paragraph_format.space_after = Pt(0)
        p.paragraph_format.left_indent = Cm(1.0 + level * 0.5)
        p.paragraph_format.first_line_indent = Cm(-0.5)
        run = p.add_run(f"•  {text}")
        run.font.name = 'Times New Roman'
        run.font.size = Pt(12)
        return p

    # Helper: Add Caption (Table/Image)
    def add_caption(text, is_table=True):
        p = doc.add_paragraph()
        p.alignment = WD_ALIGN_PARAGRAPH.LEFT if is_table else WD_ALIGN_PARAGRAPH.CENTER
        p.paragraph_format.line_spacing = 1.5
        p.paragraph_format.space_before = Pt(0)
        p.paragraph_format.space_after = Pt(0)
        p.paragraph_format.first_line_indent = Cm(0)
        run = p.add_run(text)
        run.bold = True
        run.font.name = 'Times New Roman'
        run.font.size = Pt(12)
        return p

    # Helper: Add Boxed Placeholder
    def add_placeholder_box(text):
        tbl = doc.add_table(rows=1, cols=1)
        tbl.alignment = WD_TABLE_ALIGNMENT.CENTER
        cell = tbl.cell(0, 0)
        tcPr = cell._tc.get_or_add_tcPr()
        # Shading gray #F2F2F2
        shd = parse_xml(r'<w:shd {} w:fill="F2F2F2"/>'.format(nsdecls('w')))
        tcPr.append(shd)
        # Borders dashed
        borders = parse_xml(r'<w:tcBorders {}><w:top w:val="dashed" w:sz="8" w:space="0" w:color="888888"/><w:left w:val="dashed" w:sz="8" w:space="0" w:color="888888"/><w:bottom w:val="dashed" w:sz="8" w:space="0" w:color="888888"/><w:right w:val="dashed" w:sz="8" w:space="0" w:color="888888"/></w:tcBorders>'.format(nsdecls('w')))
        tcPr.append(borders)
        
        p = cell.paragraphs[0]
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        p.paragraph_format.line_spacing = 1.5
        p.paragraph_format.space_before = Pt(6)
        p.paragraph_format.space_after = Pt(6)
        p.paragraph_format.first_line_indent = Cm(0)
        run = p.add_run(text)
        run.font.name = 'Times New Roman'
        run.font.size = Pt(12)
        run.bold = True
        run.font.color.rgb = RGBColor(80, 80, 80)
        
        # Spacer
        sp = doc.add_paragraph()
        sp.paragraph_format.line_spacing = 1.5
        sp.paragraph_format.space_before = Pt(0)
        sp.paragraph_format.space_after = Pt(0)

    # Helper: Set Table Style & Cell Borders
    def style_table(table, col_widths, headers, data):
        table.alignment = WD_TABLE_ALIGNMENT.CENTER
        # Header Row
        hdr_cells = table.rows[0].cells
        for i, title in enumerate(headers):
            hdr_cells[i].text = title
            hdr_p = hdr_cells[i].paragraphs[0]
            hdr_p.alignment = WD_ALIGN_PARAGRAPH.CENTER
            hdr_p.paragraph_format.line_spacing = 1.0
            hdr_p.paragraph_format.space_before = Pt(3)
            hdr_p.paragraph_format.space_after = Pt(3)
            hdr_p.paragraph_format.first_line_indent = Cm(0)
            for r in hdr_p.runs:
                r.bold = True
                r.font.name = 'Times New Roman'
                r.font.size = Pt(12)
            # Header shading (#D9D9D9)
            tcPr = hdr_cells[i]._tc.get_or_add_tcPr()
            shd = parse_xml(r'<w:shd {} w:fill="D9D9D9"/>'.format(nsdecls('w')))
            tcPr.append(shd)

        # Data Rows
        for row_idx, row_data in enumerate(data):
            row_cells = table.add_row().cells
            for col_idx, text_val in enumerate(row_data):
                row_cells[col_idx].text = str(text_val)
                cp = row_cells[col_idx].paragraphs[0]
                # Center align if col_idx == 0 or text is short, else justify/left
                if col_idx == 0 or len(str(text_val)) < 15:
                    cp.alignment = WD_ALIGN_PARAGRAPH.CENTER
                else:
                    cp.alignment = WD_ALIGN_PARAGRAPH.LEFT
                cp.paragraph_format.line_spacing = 1.0
                cp.paragraph_format.space_before = Pt(3)
                cp.paragraph_format.space_after = Pt(3)
                cp.paragraph_format.first_line_indent = Cm(0)
                for r in cp.runs:
                    r.font.name = 'Times New Roman'
                    r.font.size = Pt(12)

        # Set Column Widths & Solid Borders for whole table
        tblPr = table._tbl.tblPr
        tblBorders = parse_xml(r'''
            <w:tblBorders {} >
                <w:top w:val="single" w:sz="6" w:space="0" w:color="000000"/>
                <w:left w:val="single" w:sz="6" w:space="0" w:color="000000"/>
                <w:bottom w:val="single" w:sz="6" w:space="0" w:color="000000"/>
                <w:right w:val="single" w:sz="6" w:space="0" w:color="000000"/>
                <w:insideH w:val="single" w:sz="4" w:space="0" w:color="CCCCCC"/>
                <w:insideV w:val="single" w:sz="4" w:space="0" w:color="CCCCCC"/>
            </w:tblBorders>'''.format(nsdecls('w')))
        tblPr.append(tblBorders)

        for row in table.rows:
            for i, w in enumerate(col_widths):
                row.cells[i].width = Cm(w)

        # Spacer after table
        sp = doc.add_paragraph()
        sp.paragraph_format.line_spacing = 1.5
        sp.paragraph_format.space_before = Pt(0)
        sp.paragraph_format.space_after = Pt(0)

    print("Building Document Sections...")

    # ==============================================================================
    # 1. HALAMAN SAMPUL (COVER)
    # ==============================================================================
    p_cover_title = doc.add_paragraph()
    p_cover_title.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_cover_title.paragraph_format.line_spacing = 1.5
    p_cover_title.paragraph_format.space_before = Pt(0)
    p_cover_title.paragraph_format.space_after = Pt(0)
    p_cover_title.paragraph_format.first_line_indent = Cm(0)
    run_title = p_cover_title.add_run("LAPORAN PROGRESS REPORT 1 PROYEK MACHINE LEARNING\nSISTEM INFORMASI REKOMENDASI DOSEN PEMBIMBING TUGAS AKHIR (SI-REKTA) BERBASIS DUAL-SOURCE DATASET DAN EXPLAINABLE AI")
    run_title.bold = True
    run_title.font.name = 'Times New Roman'
    run_title.font.size = Pt(12)

    p_space = doc.add_paragraph()
    p_space.paragraph_format.line_spacing = 1.5
    p_space.paragraph_format.first_line_indent = Cm(0)

    add_placeholder_box("[Letakkan Logo Universitas Andalas di Sini]")

    p_cover_team = doc.add_paragraph()
    p_cover_team.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_cover_team.paragraph_format.line_spacing = 1.5
    p_cover_team.paragraph_format.space_before = Pt(0)
    p_cover_team.paragraph_format.space_after = Pt(0)
    p_cover_team.paragraph_format.first_line_indent = Cm(0)
    r_team = p_cover_team.add_run(
        "Disusun Oleh:\n"
        "Farrel Ghufran Rahman (NIM. 2411521009)\n"
        "Fuadi Dhiyaulhaq (NIM. 2411522001)\n"
        "Rafa Gian Atthari (NIM. 2411522014)\n\n"
        "Dosen Pengampu:\n"
        "Febby Apri Wenando, S.Kom., M.Eng., Ph.D.\n"
        "Aina Hubby Aziira, S.Kom., M.Eng.\n\n"
        "Mata Kuliah: Machine Learning (DSI61133) — Semester 5\n\n"
        "DEPARTEMEN SISTEM INFORMASI\n"
        "FAKULTAS TEKNOLOGI INFORMASI\n"
        "UNIVERSITAS ANDALAS\n"
        "PADANG\n"
        "2026"
    )
    r_team.bold = True
    r_team.font.name = 'Times New Roman'
    r_team.font.size = Pt(12)

    doc.add_page_break()

    # Configure Header on Section 1 to be empty on first page
    doc.sections[0].different_first_page_header_footer = True
    header = doc.sections[0].header
    hp = header.paragraphs[0]
    hp.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    hrun = hp.add_run("PROGRESS REPORT 1 — MACHINE LEARNING (SI-REKTA)")
    hrun.font.name = 'Times New Roman'
    hrun.font.size = Pt(12)

    # ==============================================================================
    # 2. KATA PENGANTAR
    # ==============================================================================
    add_heading_1("KATA PENGANTAR")
    add_body("Puji dan syukur ke hadirat Allah Subhanahu Wa Ta'ala atas rahmat dan karunia-Nya sehingga tim penyusun dapat menyelesaikan dokumen Laporan Progress Report 1 Proyek Machine Learning dengan judul \"Sistem Informasi Rekomendasi Dosen Pembimbing Tugas Akhir (SI-REKTA) Berbasis Dual-Source Dataset dan Explainable AI\" dengan baik dan tepat waktu.")
    add_body("Laporan kemajuan ini disusun sebagai bentuk dokumentasi pertanggungjawaban akademis dan teknis terhadap progres nyata yang telah dicapai dalam mata kuliah Machine Learning (DSI61133) di Departemen Sistem Informasi, Fakultas Teknologi Informasi, Universitas Andalas. Penyusunan proyek ini berlandaskan pada standar industri CRISP-ML(Q) (Cross-Industry Standard Process for the Development of Machine Learning Applications with Quality Assurance) serta menyelaraskan diri dengan silabus resmi 12 Tahapan Proyek Pembelajaran Mesin 2026.")
    add_body("Tim penyusun mengucapkan terima kasih yang sebesar-besarnya kepada Bapak Febby Apri Wenando, S.Kom., M.Eng., Ph.D. dan Ibu Aina Hubby Aziira, S.Kom., M.Eng. selaku Dosen Pengampu mata kuliah Machine Learning atas bimbingan, arahan metodologis, dan masukan konstruktif yang telah diberikan. Ucapan terima kasih juga ditujukan kepada rekan-rekan mahasiswa Departemen Sistem Informasi yang telah mendukung penyediaan korpus data riset.")
    add_body("Tim menyadari bahwa laporan kemajuan ini masih memiliki ruang penyempurnaan, khususnya pada fase finalisasi evaluasi model dan integrasi antarmuka. Oleh karena itu, kritik dan saran yang membangun sangat diharapkan demi kesempurnaan implementasi sistem pada milestone berikutnya.")

    p_ttd = doc.add_paragraph()
    p_ttd.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    p_ttd.paragraph_format.line_spacing = 1.5
    p_ttd.paragraph_format.space_before = Pt(12)
    p_ttd.paragraph_format.space_after = Pt(0)
    p_ttd.paragraph_format.first_line_indent = Cm(0)
    r_ttd = p_ttd.add_run("Padang, 28 Oktober 2026\n\n\nTim Penyusun SI-REKTA")
    r_ttd.font.name = 'Times New Roman'
    r_ttd.font.size = Pt(12)

    doc.add_page_break()

    # ==============================================================================
    # 3. DAFTAR ISI, DAFTAR TABEL, DAFTAR GAMBAR
    # ==============================================================================
    add_heading_1("DAFTAR ISI")
    daftar_isi_text = (
        "HALAMAN SAMPUL .......................................................................................................... i\n"
        "KATA PENGANTAR ......................................................................................................... ii\n"
        "DAFTAR ISI .................................................................................................................... iii\n"
        "DAFTAR TABEL ............................................................................................................... iv\n"
        "DAFTAR GAMBAR ........................................................................................................... v\n"
        "PANDUAN ISTILAH TEKNIS (GLOSARIUM) ................................................................. vi\n"
        "BAB 1: PENDAHULUAN & KERANGKA KERJA PROYEK .............................................. 1\n"
        "   1.1 Masalah Nyata yang Ingin Diselesaikan Menggunakan Machine Learning ................... 1\n"
        "   1.2 Tujuan Penerapan Machine Learning dan Manfaat yang Diharapkan .......................... 2\n"
        "   1.3 Target Pengguna dan Kebutuhan Utama Sistem yang Dikembangkan ........................ 2\n"
        "   1.4 Kerangka Kerja Mutu CRISP-ML(Q) & 12 Tahapan Resmi Proyek ML 2026 ............... 3\n"
        "   1.5 Tautan Repositori GitHub & Lingkungan Kerja ........................................................... 5\n"
        "BAB 2: PROGRESS PENGEMBANGAN MODEL MACHINE LEARNING ........................ 6\n"
        "   2.1 Problem Identification (Tahap 1) ................................................................................. 6\n"
        "   2.2 System Requirements Analysis (Tahap 2) ..................................................................... 6\n"
        "   2.3 Data Analysis & Karakteristik Data (Tahap 3) ............................................................... 7\n"
        "   2.4 Data Preprocessing (Tahap 4) .................................................................................... 10\n"
        "   2.5 Data Processing Procedures (Tahap 5) ...................................................................... 12\n"
        "   2.6 Machine Learning Algorithm Selection (Tahap 6) ...................................................... 13\n"
        "   2.7 Model Development & Late-Fusion (Tahap 7) ............................................................ 14\n"
        "   2.8 Model Evaluation (Tahap 8) ....................................................................................... 16\n"
        "   2.9 Model Storage & Rencana Tahap Selanjutnya (Tahap 9 s.d. 12) ................................... 17\n"
        "BAB 3: KENDALA DAN SOLUSI TEKNIS (KRONOLOGI EMPIRIS DARI AWAL) ........ 19\n"
        "   3.1 Kendala 1: Fenomena Zero-History Cold-Start pada 5 Dosen Tetap Aktif ................... 19\n"
        "   3.2 Kendala 2: Asumsi Awal Klasifikasi Kelompok Keahlian vs Regulasi DSI 2025 .......... 21\n"
        "   3.3 Kendala 3: Inkonsistensi Format Penulisan Nama Dosen & Dosen Non-Aktif .............. 22\n"
        "   3.4 Kendala 4: Dominasi Derau Frasa Template Formal pada Judul Tugas Akhir ................ 24\n"
        "BAB 4: KOORDINASI TIM DAN KONTRIBUSI ANGGOTA ............................................ 26\n"
        "   4.1 Pembagian Pekerjaan Masing-Masing Anggota ......................................................... 26\n"
        "   4.2 Progres & Bukti Kontribusi Nyata Masing-Masing Anggota ....................................... 27\n"
        "   4.3 Pola Koordinasi Tim Menghadapi Pekerjaan & Kendala yang Saling Berkaitan .......... 28\n"
        "LAMPIRAN ....................................................................................................................... 30\n"
    )
    add_body(daftar_isi_text, indent=0)

    doc.add_page_break()

    add_heading_1("DAFTAR TABEL")
    daftar_tabel_text = (
        "Tabel 1.1 Matriks Penyelarasan 12 Tahapan Proyek ML 2026 dengan CRISP-ML(Q) .......... 4\n"
        "Tabel 2.1 Audit Struktur dan Kelengkapan Dataset Dwisumber ............................................ 7\n"
        "Tabel 2.2 Distribusi Bimbingan Skripsi dan Publikasi Riset 17 Dosen Tetap Aktif .............. 8\n"
        "Tabel 2.3 Contoh Transformasi Teks Judul Mentah Menjadi Teks Bersih (Clean Text) ........ 11\n"
        "Tabel 4.1 Matriks Pembagian Tugas, Tanggung Jawab, dan Progres Anggota Tim ................ 26\n"
    )
    add_body(daftar_tabel_text, indent=0)

    doc.add_page_break()

    add_heading_1("DAFTAR GAMBAR")
    daftar_gambar_text = (
        "Gambar 2.1 Komparasi Bimbingan Skripsi vs Publikasi Riset 17 Dosen Tetap Aktif ........... 9\n"
        "Gambar 2.2 Tangkapan Layar Pengujian Fungsi Preprocessing NLP Akademik DSI .............. 11\n"
        "Gambar 2.3 Tangkapan Layar Ringkasan Filter 568 Skripsi Sah dan Whitelist 17 Dosen ..... 12\n"
        "Gambar 2.4 Hasil Rekomendasi Top-3 dan Kartu Explainable AI (XAI) .............................. 15\n"
        "Gambar 2.5 Hasil Evaluasi Model Stratified 5-Fold Cross Validation ................................ 16\n"
    )
    add_body(daftar_gambar_text, indent=0)

    doc.add_page_break()

    # ==============================================================================
    # 4. PANDUAN ISTILAH TEKNIS (GLOSARIUM)
    # ==============================================================================
    add_heading_1("PANDUAN ISTILAH TEKNIS (GLOSARIUM)")
    add_body("Untuk memberikan kejelasan terminologi dan standarisasi konsep ilmiah dalam laporan kemajuan ini, berikut disajikan glosarium istilah teknis Machine Learning dan Natural Language Processing (NLP) yang menjadi pilar pengembangan sistem SI-REKTA:")

    add_bullet("Academic Recommender System: Sistem temu balik informasi cerdas (Information Retrieval) yang dirancang khusus untuk merekomendasikan entitas dalam ekosistem pendidikan tinggi, seperti mencocokkan usulan topik tugas akhir mahasiswa dengan profil kepakaran dosen pembimbing.")
    add_bullet("Cold-Start Problem: Kondisi anomali kritis dalam sistem perekomendasi di mana entitas tertentu belum memiliki data riwayat transaksi atau interaksi masa lalu (dalam proyek ini: 5 dosen tetap aktif yang memiliki 0 riwayat bimbingan Pembimbing 1), sehingga terancam tidak akan pernah direkomendasikan jika model hanya dilatih dari data riwayat historis.")
    add_bullet("Dual-Source Dataset: Pendekatan integrasi data dwisumber yang menggabungkan dua korpus heterogen, yaitu data riwayat skripsi masa lalu (Judul_TA.csv sebanyak 625 data) dan data rekam jejak publikasi riset dosen (Publikasi_Dosen.csv sebanyak 643 data), guna membentuk representasi keilmuan yang holistik.")
    add_bullet("Dynamic Late-Fusion: Arsitektur perpaduan model tingkat lanjut di mana komputasi kemiripan dilakukan secara paralel pada ruang semantik bimbingan skripsi dan publikasi riset, lalu dipadukan di tahap akhir inferensi menggunakan bobot pembagi adaptif alpha yang disesuaikan dengan status riwayat bimbingan masing-masing dosen.")
    add_bullet("Direct Recommendation (Non-KK): Paradigma pencocokan langsung yang memetakan kalimat ide judul skripsi mahasiswa secara langsung ke 17 entitas dosen tetap aktif tanpa melalui perantara klasifikasi Kelompok Keahlian (KK), memitigasi risiko cascading error bertingkat.")
    add_bullet("TF-IDF N-Gram: Algoritma pembobotan statistik leksikal (Term Frequency - Inverse Document Frequency) yang memperhitungkan urutan kemunculan satu kata (unigram), dua kata (bigram), dan tiga kata (trigram) secara simultan guna menjaga keutuhan makna istilah teknologi dwibahasa.")
    add_bullet("Cosine Similarity: Metrik pengukuran keselarasan orientasi semantik antara dua vektor multidimensi dalam ruang fitur bersama (shared vector space) dengan menghitung nilai kosinus sudut di antara keduanya (skala 0.0 s.d. 1.0 atau 0% s.d. 100%).")
    add_bullet("Entity Canonicalization (Whitelist): Teknik pembersihan dan resolusi entitas data untuk menormalisasi variasi ejaan nama, pemendekan nama belakang, serta perbedaan format penulisan gelar akademis ke satu bentuk entitas baku resmi yang terdaftar di pangkalan data departemen.")
    add_bullet("Explainable AI (XAI): Paradigma kecerdasan buatan terjelaskan yang berorientasi pada transparansi (white-box AI), di mana sistem menyajikan kartu rekomendasi lengkap dengan persentase skor kecocokan, ekstraksi kata kunci keselarasan topik, serta bukti kutipan artikel ilmiah nyata karya dosen pendukung.")
    add_bullet("CRISP-ML(Q): Standar industri rekayasa perangkat lunak pembelajaran mesin (Cross-Industry Standard Process for the Development of Machine Learning Applications with Quality Assurance) yang menekankan pengawasan mutu berkelanjutan pada setiap fase siklus hidup sistem.")

    doc.add_page_break()

    # ==============================================================================
    # 5. BAB 1: PENDAHULUAN & KERANGKA KERJA PROYEK
    # ==============================================================================
    add_heading_1("BAB 1: PENDAHULUAN & KERANGKA KERJA PROYEK")

    add_heading_2("1.1 Masalah Nyata yang Ingin Diselesaikan Menggunakan Machine Learning")
    add_body("Proses penentuan calon dosen Pembimbing 1 tugas akhir di Departemen Sistem Informasi, Fakultas Teknologi Informasi, Universitas Andalas selama bertahun-tahun menghadapi kendala operasional yang berakar dari keterbatasan informasi dan proses konvensional. Mahasiswa tingkat akhir yang hendak mengisi Formulir TA-01 (Pengajuan Topik) dan Formulir TA-02 (Pendaftaran Judul) kerap mengalami kebingungan dalam menentukan dosen pembimbing yang linier dengan topik riset yang diajukan.")
    add_body("Berdasarkan hasil observasi dan audit empiris, kondisi tersebut memicu tiga permasalahan nyata di lingkungan kampus:")
    add_bullet("Ketidaksesuaian Topik (Topic Mismatch): Mahasiswa kerap mengajukan usulan proposal skripsi yang tidak selaras dengan peta jalan riset terkini dosen, sehingga memicu penolakan proposal berulang kali, revisi besar-besaran, hingga perpanjangan masa studi yang tidak perlu.")
    add_bullet("Ketimpangan Beban Bimbingan (Workload Imbalance): Penentuan pembimbing secara subjektif memicu penumpukan antrean mahasiswa bimbingan pada sejumlah dosen senior yang populer (tercatat membimbing hingga 149 mahasiswa), sedangkan dosen-dosen tetap aktif lainnya yang memiliki kompetensi riset relevan justru minim bimbingan.")
    add_bullet("Tantangan Kritis Zero-History Cold-Start: Dari 17 Dosen Tetap Aktif Departemen Sistem Informasi, audit data historis membuktikan terdapat 5 dosen yang memiliki 0 riwayat bimbingan sebagai Pembimbing 1. Jika model Machine Learning hanya dilatih menggunakan data skripsi alumni masa lalu, kelima dosen ini memiliki probabilitas kemunculan nol dan tidak akan pernah direkomendasikan.")

    add_heading_2("1.2 Tujuan Penerapan Machine Learning dan Manfaat yang Diharapkan")
    add_body("Penerapan Machine Learning melalui proyek SI-REKTA bertujuan untuk mentransformasikan proses penentuan dosen pembimbing dari pendekatan subjektif menjadi berbasis data objektif (data-driven). Dengan memanfaatkan teknik Natural Language Processing (NLP) berbasis TF-IDF N-gram dan Cosine Similarity berbobot adaptif (Dynamic Late-Fusion), sistem mampu memetakan kalimat usulan judul tugas akhir mahasiswa secara langsung ke profil kepakaran 17 Dosen Tetap Aktif DSI Unand.")
    add_body("Manfaat yang diharapkan mencakup:")
    add_bullet("Bagi Mahasiswa: Memperoleh rekomendasi Top-3 calon dosen pembimbing yang paling selaras secara instan (< 500 ms), lengkap dengan bukti kutipan paper ilmiah nyata dosen sebagai dasar argumen objektif pengisian Formulir TA-01/TA-02.")
    add_bullet("Bagi Departemen & Koordinator TA: Mewujudkan pemerataan alokasi beban bimbingan tugas akhir secara proporsional serta menjamin keterpilihan dosen-dosen baru berbasis keaktifan riset terkini.")

    add_heading_2("1.3 Target Pengguna dan Kebutuhan Utama Sistem yang Dikembangkan")
    add_body("Sistem SI-REKTA dirancang dengan target pengguna utama adalah Mahasiswa Tingkat Akhir Departemen Sistem Informasi FTI Universitas Andalas sebagai pengguna tunggal (Single Primary User). Karakteristik interaksi sistem dirancang sebagai Public Utility Web Application tanpa kewajiban autentikasi akun (no-login) guna meminimalkan hambatan adopsi pengguna.")
    add_body("Kebutuhan fungsional utama sistem meliputi formulir penampung usulan judul skripsi, mesin inferensi perankingan dosen Top-3 berbasis keselarasan semantik dwisumber, penyajian kartu Explainable AI (XAI), serta direktori interaktif 17 Dosen Tetap Aktif DSI Unand.")

    add_heading_2("1.4 Kerangka Kerja Mutu CRISP-ML(Q) & 12 Tahapan Resmi Proyek ML 2026")
    add_body("Pengembangan proyek SI-REKTA mengadopsi standar rekayasa pembelajaran mesin CRISP-ML(Q) yang diselaraskan secara langsung dengan 12 tahapan pelaksanaan resmi yang ditetapkan dalam silabus Project Machine Learning 2026:")
    
    p_stages = doc.add_paragraph()
    p_stages.paragraph_format.line_spacing = 1.5
    p_stages.paragraph_format.first_line_indent = Cm(1.0)
    r_st = p_stages.add_run(
        "\"The project consists of the following stages:\n"
        "• Problem Identification\n"
        "• System Requirements Analysis\n"
        "• Data Analysis\n"
        "• Data Preprocessing\n"
        "• Data Processing Procedures\n"
        "• Machine Learning Algorithm Selection\n"
        "• Model Development\n"
        "• Model Evaluation\n"
        "• Model Storage\n"
        "• Information System Design\n"
        "• Model Integration into the System\n"
        "• User Interface Implementation\""
    )
    r_st.font.name = 'Times New Roman'
    r_st.font.size = Pt(12)
    r_st.italic = True

    add_body("Status ketercapaian dan pemetaan ke-12 tahapan tersebut disajikan secara transparan pada Tabel 1.1:")

    add_caption("Tabel 1.1 Matriks Penyelarasan 12 Tahapan Proyek ML 2026 dengan CRISP-ML(Q) & Status Ketercapaian", is_table=True)
    table_1_headers = ["No", "12 Tahapan Proyek ML 2026", "Fase CRISP-ML(Q)", "Implementasi pada SI-REKTA", "Status Progres"]
    table_1_widths = [1.0, 3.8, 3.2, 4.5, 2.5]
    table_1_data = [
        ["1", "Problem Identification", "Business & Data Understanding", "Identifikasi topic mismatch, workload imbalance, dan cold-start 5 dosen aktif.", "Selesai (100%)"],
        ["2", "System Requirements Analysis", "Business & Data Understanding", "Spesifikasi batasan 17 dosen tetap aktif, latensi < 500 ms, dan target Hit@3.", "Selesai (100%)"],
        ["3", "Data Analysis", "Business & Data Understanding", "Audit eksploratif terhadap Judul_TA.csv (625) dan Publikasi_Dosen.csv (643).", "Selesai (100%)"],
        ["4", "Data Preprocessing", "Data Preparation", "Normalisasi teks, case folding, regex stripping, dan custom DSI academic stopwords.", "Selesai (100%)"],
        ["5", "Data Processing Procedures", "Data Preparation", "Standarisasi entitas (whitelist 17 dosen) dan ekstraksi fitur TF-IDF N-gram bersama.", "Selesai (100%)"],
        ["6", "ML Algorithm Selection", "Model Engineering", "Pemilihan Direct Dual-Source Cosine Similarity Late-Fusion tanpa klasifikasi KK.", "Selesai (100%)"],
        ["7", "Model Development", "Model Engineering", "Pembangunan fungsi perankingan predict_top_lecturers dan modul Explainable AI (XAI).", "Sedang Berjalan"],
        ["8", "Model Evaluation", "Model Evaluation & QA", "Evaluasi kuantitatif Stratified 5-Fold Cross Validation, Hit@3, MRR, dan stress test.", "Sedang Berjalan"],
        ["9", "Model Storage", "Deployment Preparation", "Serialisasi bundel model ke si_rekta_pipeline.joblib dan uji reload benchmark NFR.", "Sedang Berjalan"],
        ["10", "Information System Design", "System Deployment", "Perancangan arsitektur perangkat lunak Three-Tier (UI, FastAPI, dan PostgreSQL).", "Rencana Tahap 2"],
        ["11", "Model Integration", "System Deployment", "Integrasi biner pipeline .joblib ke endpoint web service REST API Python FastAPI.", "Rencana Tahap 2"],
        ["12", "User Interface Implementation", "System Deployment", "Pembangunan antarmuka web interaktif mahasiswa untuk pengisian draf judul dan XAI.", "Rencana Tahap 2"]
    ]
    tbl_1 = doc.add_table(rows=1, cols=5)
    style_table(tbl_1, table_1_widths, table_1_headers, table_1_data)

    add_heading_2("1.5 Tautan Repositori GitHub & Lingkungan Kerja")
    add_body("Seluruh artefak proyek, naskah tinjauan literatur, spesifikasi kebutuhan, dan lingkungan eksekusi kode dikelola secara terpusat pada repositori dan tautan kerja berikut:")
    add_bullet("Repositori Resmi GitHub: https://github.com/accfd/SI-REKTA")
    add_bullet("Buku Kerja Realtime (Google Colab): https://colab.research.google.com/drive/1wxg3qMF81WH9fQY16obTXagDF0Ql383G")
    add_bullet("Dokumen Systematic Literature Review (SLR): docs/SI-REKTA_SLR.md")
    add_bullet("Dokumen Kerangka Kerja CRISP-ML(Q): docs/SI-REKTA_CRISP_ML_Q.md")
    add_bullet("Dokumen Product Requirements Document (PRD): docs/SI-REKTA_PRD.md")

    doc.add_page_break()

    # ==============================================================================
    # 6. BAB 2: PROGRESS PENGEMBANGAN MODEL MACHINE LEARNING
    # ==============================================================================
    add_heading_1("BAB 2: PROGRESS PENGEMBANGAN MODEL MACHINE LEARNING")

    add_heading_2("2.1 Problem Identification (Tahap 1)")
    add_body("Tahap pertama membatasi ruang lingkup rekomendasi secara ketat hanya pada 17 Dosen Tetap Aktif Departemen Sistem Informasi Universitas Andalas. Batasan ini mengeliminasi risiko sistem merekomendasikan dosen luar fakultas, dosen purna tugas, atau dosen cuti yang secara hukum akademik tidak berwenang menjadi Pembimbing 1 tugas akhir.")

    add_heading_2("2.2 System Requirements Analysis (Tahap 2)")
    add_body("Berdasarkan telaah Pedoman Topik Tugas Akhir DSI 2025 dan kebutuhan operasional departemen, sistem menetapkan beberapa spesifikasi kunci: (1) Mekanisme pencocokan langsung tanpa melalui struktur birokrasi Kelompok Keahlian (KK); (2) Latensi komputasi inferensi sub-detik (< 500 ms) sesuai NFR-01; (3) Target performa evaluasi Top-3 Accuracy >= 80% dan MRR >= 0.60; serta (4) Transparansi penalaran melalui kartu Explainable AI (XAI).")

    add_heading_2("2.3 Data Analysis & Karakteristik Data (Tahap 3)")
    add_body("Karakteristik data yang digunakan dalam proyek ini mengadopsi skema dwisumber (Dual-Source Dataset):")
    add_bullet("Dataset 1 (Judul_TA.csv): Memuat 625 baris data historis skripsi alumni DSI Unand tahun 2017–2024 dengan 8 atribut: no, judul_ta, nama_mahasiswa, nim, tahun, pembimbing_1, pembimbing_2, dan poster.")
    add_bullet("Dataset 2 (Publikasi_Dosen.csv): Memuat 643 baris rekaman artikel publikasi ilmiah resmi dari 17 dosen tetap aktif DSI Unand dengan 5 atribut: no, judul_publikasi, nama_dosen, kelompok_keahlian, dan tahun.")

    add_caption("Tabel 2.1 Audit Struktur dan Kelengkapan Dataset Dwisumber", is_table=True)
    table_2_1_headers = ["Indikator Audit", "Dataset 1 (Judul_TA.csv)", "Dataset 2 (Publikasi_Dosen.csv)"]
    table_2_1_widths = [5.0, 5.5, 5.5]
    table_2_1_data = [
        ["Total Rekaman Data Mentah", "625 Baris Skripsi Alumni", "643 Baris Artikel Publikasi"],
        ["Jumlah Atribut Kolom", "8 Kolom", "5 Kolom"],
        ["Missing Values pada Teks Judul", "0 Missing Value (100% Utuh)", "0 Missing Value (100% Utuh)"],
        ["Missing Values pada Nama Dosen", "0 Missing Value", "0 Missing Value"],
        ["Karakteristik Teks", "Short-text formal Indonesia", "Teks ilmiah dwibahasa (ID & EN)"],
        ["Distribusi Dosen", "Mencakup dosen aktif & purna tugas", "Tepat 17 Dosen Tetap Aktif DSI"]
    ]
    tbl_2_1 = doc.add_table(rows=1, cols=3)
    style_table(tbl_2_1, table_2_1_widths, table_2_1_headers, table_2_1_data)

    add_body("Audit distribusi data riwayat bimbingan membuktikan adanya ketimpangan beban bimbingan (Workload Imbalance) yang masif serta mengonfirmasi 5 dosen berstatus Zero-History Cold-Start, sebagaimana dipaparkan pada Tabel 2.2:")

    add_caption("Tabel 2.2 Distribusi Bimbingan Skripsi dan Publikasi Riset 17 Dosen Tetap Aktif DSI Unand", is_table=True)
    table_2_2_headers = ["No", "Nama Dosen Tetap Aktif (Whitelisted)", "Bimbingan Skripsi", "Publikasi Riset", "Status Bimbingan"]
    table_2_2_widths = [1.0, 7.5, 2.5, 2.5, 2.5]
    table_2_2_data = [
        ["1", "Ricky Akbar, M.Kom.", "149 Skripsi", "174 Paper", "Bimbingan Aktif"],
        ["2", "Husnil Kamil, M.T.", "93 Skripsi", "24 Paper", "Bimbingan Aktif"],
        ["3", "Prof. Surya Afnarius, Ph.D.", "87 Skripsi", "26 Paper", "Bimbingan Aktif"],
        ["4", "Haris Suryamen, M.Sc.", "67 Skripsi", "25 Paper", "Bimbingan Aktif"],
        ["5", "Hasdi Putra, M.T.", "49 Skripsi", "31 Paper", "Bimbingan Aktif"],
        ["6", "Fajril Akbar, M.Sc.", "38 Skripsi", "99 Paper", "Bimbingan Aktif"],
        ["7", "Rahmatika Pratama Santi, M.T.", "30 Skripsi", "15 Paper", "Bimbingan Aktif"],
        ["8", "Dwi Welly Sukma Nirad, M.T.", "18 Skripsi", "19 Paper", "Bimbingan Aktif"],
        ["9", "Afriyanti Dwi Kartika, S.Pd., M.T.", "13 Skripsi", "27 Paper", "Bimbingan Aktif"],
        ["10", "Ullya Mega Wahyuni, M.Kom.", "13 Skripsi", "21 Paper", "Bimbingan Aktif"],
        ["11", "Jefril Rahmadoni, M.Kom.", "10 Skripsi", "29 Paper", "Bimbingan Aktif"],
        ["12", "Hafizah Hanim, M.Kom.", "1 Skripsi", "76 Paper", "Bimbingan Aktif"],
        ["13", "Febby Apri Wenando, M.Eng., Ph.D.", "0 Skripsi", "32 Paper", "Cold-Start"],
        ["14", "Adi Arga Arifnur, M.Kom.", "0 Skripsi", "18 Paper", "Cold-Start"],
        ["15", "Nisa Dwi Angresti, M.Kom.", "0 Skripsi", "11 Paper", "Cold-Start"],
        ["16", "Hafzatin Nurlatifa, M.Eng.", "0 Skripsi", "9 Paper", "Cold-Start"],
        ["17", "Aina Hubby Aziira, M.Eng.", "0 Skripsi", "7 Paper", "Cold-Start"]
    ]
    tbl_2_2 = doc.add_table(rows=1, cols=5)
    style_table(tbl_2_2, table_2_2_widths, table_2_2_headers, table_2_2_data)

    add_placeholder_box("[Letakkan Gambar 2.1: Tangkapan Layar Horizontal Bar Chart Komparasi Bimbingan vs Publikasi 17 Dosen dari Output Cell 17 Notebook di Sini]")
    add_caption("Gambar 2.1 Komparasi Bimbingan Skripsi vs Publikasi Riset 17 Dosen Tetap Aktif", is_table=False)
    add_body("Gambar 2.1 menyajikan bukti empiris dari output Cell 17 buku kerja Google Colab. Terlihat polarisasi ekstrem pada data bimbingan masa lalu, di mana dosen senior menampung beban akumulasi tertinggi hingga 149 mahasiswa. Sebaliknya, pada bagian bawah grafik, kelima dosen cold-start memiliki batang bimbingan skripsi bernilai 0 namun memiliki batang publikasi oranye yang padat dan produktif.")

    add_heading_2("2.4 Data Preprocessing (Tahap 4)")
    add_body("Teks judul tugas akhir mahasiswa tergolong ke dalam struktur teks pendek (short-text) dengan rata-rata 13–17 kata per kalimat. Analisis frekuensi membuktikan bahwa lebih dari 65% judul skripsi didominasi oleh kata-kata template formal administratif (seperti \"rancang bangun\", \"sistem informasi\", \"berbasis web\", \"pada pt\", \"di dinas\") yang jika dibiarkan akan mendominasi bobot TF-IDF dan menutupi topik keilmuan spesifik.")
    add_body("Untuk mengatasi derau tersebut, dirancang kamus khusus DSI_ACADEMIC_STOPWORDS (memuat 120+ kata henti akademik) yang menyaring kata template formal tanpa merusak keutuhan istilah teknologi dwibahasa (seperti machine learning, data warehouse, business intelligence, enterprise architecture).")

    add_caption("Tabel 2.3 Contoh Transformasi Teks Judul Mentah Menjadi Teks Bersih (Clean Text)", is_table=True)
    table_2_3_headers = ["No", "Teks Judul Mentah (Raw Academic Text)", "Hasil Pembersihan NLP (Clean Thematic Keywords)"]
    table_2_3_widths = [1.0, 7.5, 7.5]
    table_2_3_data = [
        ["1", "Rancang Bangun Sistem Informasi Logistik Aktiva Tetap Berbasis Web pada PT. Semen Padang", "logistik aktiva tetap semen"],
        ["2", "Pembangunan Aplikasi Mobile Geographic Information System Wisata Sejarah Kota Padang", "geographic information system wisata sejarah"],
        ["3", "Penerapan Algoritma K-Means Clustering untuk Segmentasi Pelanggan pada Data Penjualan Retail", "k means clustering segmentasi pelanggan penjualan retail"],
        ["4", "Analisis Tata Kelola Teknologi Informasi Menggunakan Framework COBIT 5 pada Dinas Kominfo", "tata kelola teknologi cobit dinas kominfo"],
        ["5", "Perencanaan Enterprise Architecture Menggunakan TOGAF ADM pada Rumah Sakit Unand", "enterprise architecture togaf adm rumah sakit unand"]
    ]
    tbl_2_3 = doc.add_table(rows=1, cols=3)
    style_table(tbl_2_3, table_2_3_widths, table_2_3_headers, table_2_3_data)

    add_placeholder_box("[Letakkan Gambar 2.2: Tangkapan Layar Pengujian Fungsi Preprocessing NLP Akademik DSI dari Output Cell 20 Notebook di Sini]")
    add_caption("Gambar 2.2 Tangkapan Layar Pengujian Fungsi Preprocessing NLP Akademik DSI", is_table=False)
    add_body("Tangkapan layar pada Gambar 2.2 memperlihatkan bukti verifikasi dari output Cell 20 Colab, di mana kalimat uji resmi berhasil dibersihkan dari derau administratif dan murni menyisakan kata kunci tematik diskriminatif berbobot tinggi.")

    add_heading_2("2.5 Data Processing Procedures (Tahap 5)")
    add_body("Prosedur pemrosesan data mencakup dua langkah utama: kanonikalisasi nama dosen dan ekstraksi fitur n-gram bersama. Daftar whitelist 17 dosen diekstrak langsung dari Dataset 2 secara dinamis. Fungsi clean_name_key membuang variasi gelar akademis dan memetakan singkatan nama belakang pada Dataset 1 ke nama resmi bergelar lengkap. Prosedur ini berhasil menyaring tepat 568 skripsi sah dan mengeliminasi 57 data dosen luar/purna tugas secara presisi.")

    add_placeholder_box("[Letakkan Gambar 2.3: Tangkapan Layar Ringkasan Filter 568 Skripsi Sah dan Whitelist 17 Dosen dari Output Cell 11 Notebook di Sini]")
    add_caption("Gambar 2.3 Tangkapan Layar Ringkasan Filter 568 Skripsi Sah dan Whitelist 17 Dosen", is_table=False)

    add_body("Selanjutnya, seluruh korpus bersih skripsi dan publikasi digabungkan untuk melatih satu TfidfVectorizer bersama dengan parameter ngram_range=(1, 3), max_features=5000, sublinear_tf=True, dan min_df=2. Agregasi dokumen per dosen menghasilkan matrix_skripsi_dosen (ukuran 17 x N) dan matrix_publikasi_dosen (ukuran 17 x N).")

    add_heading_2("2.6 Machine Learning Algorithm Selection (Tahap 6)")
    add_body("Pemilihan algoritma didasarkan pada karakteristik data teks pendek akademik dan kebutuhan bisnis departemen. Tim mengadopsi Direct Dual-Source Cosine Similarity Late-Fusion. Pendekatan ini dipilih dibandingkan klasifikasi parametrik tertutup (seperti SVM multi-kelas atau Naive Bayes) karena: (1) Sistem rekomendasi akademik bersifat Information Retrieval perankingan berkelanjutan; (2) Bebas dari risiko cascading error akibat pemisahan klasifikasi KK; dan (3) Fleksibel mengakomodasi dosen cold-start tanpa merusak matriks probabilitas.")

    add_heading_2("2.7 Model Development & Late-Fusion (Tahap 7)")
    add_body("Inti pemodelan SI-REKTA dibangun melalui fungsi predict_top_lecturers yang memadukan skor kemiripan kosinus usulan judul mahasiswa terhadap profil skripsi (S_skripsi) dan profil publikasi (S_publikasi) menggunakan formula Dynamic Late-Fusion:")
    
    p_eq = doc.add_paragraph()
    p_eq.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_eq.paragraph_format.line_spacing = 1.5
    p_eq.paragraph_format.first_line_indent = Cm(0)
    r_eq = p_eq.add_run("S_final(D_i) = α_i · CosineSim(Q, V_skripsi^(i)) + (1 - α_i) · CosineSim(Q, V_publikasi^(i))")
    r_eq.font.name = 'Times New Roman'
    r_eq.font.size = Pt(12)
    r_eq.bold = True

    add_body("Nilai bobot adaptif alpha ditetapkan: (1) Dosen Senior (N_skripsi >= 10): alpha = 0.60; (2) Dosen Berkembang (1 <= N_skripsi < 10): alpha = 0.30; dan (3) Dosen Cold-Start (N_skripsi = 0): alpha = 0.00 (murni dinilai 100% dari publikasi riset). Setiap rekomendasi dilengkapi kartu Explainable AI (XAI) yang memuat persentase kecocokan, 3–5 kata kunci keselarasan n-gram, dan 2–3 rujukan artikel ilmiah asli dosen.")

    add_placeholder_box("[Placeholder Gambar/Tabel 2.4: Hasil Rekomendasi Top-3 dan Kartu Explainable AI (XAI) Farrel — Disalin dari Output Prompt 11 & 13 Notebook Colab]")
    add_caption("Gambar 2.4 Hasil Rekomendasi Top-3 dan Kartu Explainable AI (XAI)", is_table=False)

    add_heading_2("2.8 Model Evaluation (Tahap 8)")
    add_body("Evaluasi model dirancang menggunakan validasi silang ilmiah Stratified 5-Fold Cross Validation pada data historis skripsi. Metrik evaluasi mencakup Hit Rate at Top-3 (Hit@3 dengan target >= 80%) dan Mean Reciprocal Rank (MRR@3 dengan target >= 0.60). Di samping itu, dilakukan Stress Test Cold-Start khusus untuk membuktikan bahwa kueri yang mengutip topik riset dosen cold-start mampu menempatkan dosen tersebut pada peringkat Top-3 secara sah.")

    add_placeholder_box("[Placeholder Gambar/Tabel 2.5: Hasil Evaluasi Model Stratified 5-Fold Cross Validation dan Stress Test Cold-Start Rafa — Disalin dari Output Prompt 12 & 14 Notebook Colab]")
    add_caption("Gambar 2.5 Hasil Evaluasi Model Stratified 5-Fold Cross Validation", is_table=False)

    add_heading_2("2.9 Model Storage & Rencana Tahap Selanjutnya (Tahap 9 s.d. 12)")
    add_body("Seluruh artefak pemodelan (vectorizer, matriks skripsi, matriks publikasi, metadata 17 dosen, kamus stopwords, dan arsip publikasi) dikemas dan diserialisasikan ke dalam satu berkas mandiri si_rekta_pipeline.joblib dengan kompresi level 3 (ukuran berkas sangat efisien sekitar 0.16 MB). Pengujian reload mandiri membuktikan latensi inferensi berada pada kisaran 2–4 milidetik, jauh di bawah ambang batas NFR-01 (< 500 ms).")
    add_body("Pada milestone berikutnya, artefak model ini akan diintegrasikan ke dalam layanan web Three-Tier Architecture yang mencakup backend REST API berbasis Python FastAPI dan antarmuka web interaktif mahasiswa.")

    doc.add_page_break()

    # ==============================================================================
    # 7. BAB 3: KENDALA DAN SOLUSI TEKNIS (KRONOLOGI EMPIRIS DARI AWAL)
    # ==============================================================================
    add_heading_1("BAB 3: KENDALA DAN SOLUSI TEKNIS (KRONOLOGI EMPIRIS DARI AWAL)")

    add_heading_2("3.1 Kendala 1: Fenomena Zero-History Cold-Start pada 5 Dosen Tetap Aktif")
    add_body("Kronologi Munculnya Masalah: Pada awal inisiasi proyek, tim hanya mengumpulkan Dataset 1 (Judul_TA.csv) berisi 625 riwayat skripsi alumni 2017–2024. Asumsi awal tim adalah model klasifikasi multi-kelas konvensional (seperti SVM atau Naive Bayes) dapat langsung dilatih untuk memprediksi dosen pembimbing. Namun, saat analisis data eksploratif (EDA) awal dilakukan pada kolom pembimbing_1, tim menemukan fakta mengejutkan: dari 17 Dosen Tetap Aktif DSI Unand, terdapat 5 dosen yang memiliki 0 riwayat bimbingan sebagai Pembimbing 1.")
    add_body("Analisis Akar Penyebab: Kelima dosen tersebut baru aktif ditugaskan membimbing dalam beberapa semester terakhir atau arsip bimbingan lampaunya belum tercatat dalam kurun waktu 2017–2024. Jika model hanya dilatih dari Dataset 1, probabilitas prior kelima dosen tersebut mutlak bernilai 0 (P(Dosen) = 0). Akibatnya, model pembelajaran mesin konvensional tidak akan pernah merekomendasikan mereka seumur hidup sistem, menciptakan bias popularitas ekstrem dan ketidakadilan representasi keilmuan.")
    add_body("Upaya & Solusi Ilmiah Tim: Menyadari kegagalan asumsi awal tersebut, tim melakukan penelusuran literatur sistematis (SLR mini) mengenai Recommender System dan menemukan solusi berbasis Cross-Domain Knowledge Integration. Tim kemudian melakukan penambangan data untuk menghimpun Dataset 2 (Publikasi_Dosen.csv berisi 643 judul artikel riset resmi dosen dari Google Scholar dan Sinta). Tim merumuskan formula Dynamic Late-Fusion di mana bobot alpha diatur adaptif menjadi 0.00 bagi dosen cold-start (dinilai 100% dari kemiripan artikel publikasi riset mereka).")
    add_body("Hasil dan Bukti Nyata: Masalah cold-start teratasi 100%. Kelima dosen memiliki profil representasi vektor riset yang padat dan terbukti berhasil menduduki peringkat Top-3 pada pengujian kueri yang selaras dengan topik publikasi mereka.")

    add_heading_2("3.2 Kendala 2: Asumsi Awal Klasifikasi Kelompok Keahlian vs Regulasi DSI 2025")
    add_body("Kronologi Munculnya Masalah: Pada rancangan awal metodologi, tim sempat menyusun rencana klasifikasi hierarki dua tingkat (Hierarchical Two-Stage Classification), di mana usulan judul mahasiswa dipetakan terlebih dahulu ke dalam 4 Kelompok Keahlian (KK: RD-BI, SD, SE, TK-ITI), baru kemudian merekomendasikan dosen di dalam KK terpilih.")
    add_body("Analisis Akar Penyebab: Ketika tim membedah dokumen resmi Pedoman Topik Tugas Akhir DSI 2025 dan Panduan Tugas Akhir 2025, ditemukan fakta yuridis penting bahwa proses pengajuan pembimbing tugas akhir oleh mahasiswa (Formulir TA-01/TA-02) berjalan LANGSUNG antara mahasiswa dan dosen pembimbing tanpa melalui struktur birokrasi Kelompok Keahlian. Selain itu, klasifikasi bertingkat menimbulkan risiko fatal Cascading Error: jika prediksi KK di tingkat pertama salah, rekomendasi dosen di tingkat kedua otomatis 100% keliru.")
    add_body("Upaya & Solusi Ilmiah Tim: Tim melakukan refactoring arsitektur secara fundamental dengan menghapus lapisan klasifikasi perantara KK dan mengadopsi Direct Dual-Source Lecturer Recommendation yang mencocokkan usulan judul langsung ke 17 entitas dosen tetap aktif.")
    add_body("Hasil dan Bukti Nyata: Kompleksitas model berkurang drastis, risiko cascading error tereliminasi sepenuhnya, dan arsitektur sistem menjadi 100% selaras dengan regulasi resmi departemen.")

    add_heading_2("3.3 Kendala 3: Inkonsistensi Format Penulisan Nama Dosen & Dosen Non-Aktif")
    add_body("Kronologi Munculnya Masalah: Pada Dataset 1, pencatatan nama dosen pada kolom pembimbing_1 sangat bervariasi (misal: singkatan marga/nama belakang \"Rahmatika Pratama S, MT\", \"Dwi Welly Sukma N, MT\", perbedaan ejaan \"Jefril Ramadoni\"), serta tercampurnya dosen purna tugas atau dosen luar fakultas (seperti Alizar Hasan, Meza Silvana, Syafii, Wahyudi).")
    add_body("Analisis Akar Penyebab: Data skripsi historis dicatat secara manual oleh mahasiswa dan staf administrasi selama bertahun-tahun tanpa validasi basis data terpusat. Jika tidak disaring, model akan memperlakukan satu dosen sebagai beberapa kelas yang berbeda, atau merekomendasikan dosen yang sudah pensiun/tidak aktif.")
    add_body("Upaya & Solusi Ilmiah Tim: Tim menolak pendekatan hardcoding manual 17 nama dosen karena boros baris kode dan tidak dinamis. Sebagai gantinya, tim memanfaatkan kolom nama_dosen pada Dataset 2 yang bergelar resmi sebagai Canonical Whitelist dinamis. Tim membangun fungsi pembersihan string clean_name_key dan kamus pemetaan canonical_mapping otomatis.")
    add_body("Hasil dan Bukti Nyata: Tepat 17 Dosen Tetap Aktif berhasil dipetakan dengan akurasi 100%, 568 riwayat skripsi sah berhasil diverifikasi, dan 57 data bimbingan dosen luar/purna tugas otomatis tereliminasi secara bersih.")

    add_heading_2("3.4 Kendala 4: Dominasi Derau Frasa Template Formal pada Judul Tugas Akhir")
    add_body("Kronologi Munculnya Masalah: Saat melakukan pembobotan kata awal pada Dataset 1, tim menemukan bahwa kata-kata dengan frekuensi tertinggi bukanlah topik keilmuan, melainkan kata-kata template formal administratif skripsi.")
    add_body("Analisis Akar Penyebab: Standar konvensi penulisan judul tugas akhir di DSI Unand mewajibkan kata baku metodologis (seperti \"Rancang Bangun\", \"Sistem Informasi Berbasis Web\", \"Aplikasi Mobile Android\", \"Studi Kasus pada PT/Dinas\"). Kata template ini muncul di lebih dari 65% judul skripsi, sehingga mendominasi bobot TF-IDF dan menutupi topik substansi sebenarnya (seperti \"supply chain\", \"churn\", \"audit tata kelola\"). Kamus stopwords umum bahasa Indonesia (seperti Sastrawi) terbukti tidak memuat kata-kata template akademik ini.")
    add_body("Upaya & Solusi Ilmiah Tim: Tim merancang kamus khusus DSI_ACADEMIC_STOPWORDS (memuat 120+ kata henti akademik DSI) yang membuang kata template administratif, namun tetap menjaga keutuhan istilah komputasi IT dwibahasa melalui fitur n-gram (1,3).")
    add_body("Hasil dan Bukti Nyata: Teks judul tugas akhir berhasil tereduksi murni menjadi kata kunci tematik berbobot informatif tinggi (contoh: kalimat uji mentah tereduksi presisi menjadi \"logistik aktiva tetap semen\").")

    doc.add_page_break()

    # ==============================================================================
    # 8. BAB 4: KOORDINASI TIM DAN KONTRIBUSI ANGGOTA
    # ==============================================================================
    add_heading_1("BAB 4: KOORDINASI TIM DAN KONTRIBUSI ANGGOTA")

    add_heading_2("4.1 Pembagian Pekerjaan Masing-Masing Anggota")
    add_body("Pengembangan proyek SI-REKTA dilaksanakan secara kolaboratif dengan pembagian peran kerja yang terstruktur dan terukur. Setiap anggota memegang tanggung jawab pada fase-fase tertentu dalam kerangka kerja CRISP-ML(Q) dan 17 prompt modular pada buku kerja Google Colab, sebagaimana dirangkum pada Tabel 4.1:")

    add_caption("Tabel 4.1 Matriks Pembagian Tugas, Tanggung Jawab, dan Progres Anggota Tim", is_table=True)
    table_4_headers = ["Nama Anggota Tim", "Peran & Lingkup Tanggung Jawab", "Cakupan Eksekusi Teknis (Colab)", "Status Ketercapaian"]
    table_4_widths = [4.0, 5.0, 4.5, 2.5]
    table_4_data = [
        [
            "Fuadi Dhiyaulhaq\n(NIM. 2411522001)",
            "Data Understanding, Data Audit, & Data Preprocessing Specialist",
            "Fase 1 & Fase 2:\n• Setup environment & data loading (Prompt 0–3)\n• Whitelist 17 dosen & name mapping (Prompt 4–6)\n• NLP custom stopwords & transformasi korpus (Prompt 7–8)",
            "Selesai (100% Done)"
        ],
        [
            "Rafa Gian Atthari\n(NIM. 2411522014)",
            "Feature Engineering, Core Modeling, & Explainable AI Specialist",
            "Fase 3:\n• Shared TF-IDF N-gram (1,3) Vectorizer (Prompt 9)\n• Matriks profil ganda dosen 17 x N (Prompt 10)\n• Algoritma Dynamic Late-Fusion (Prompt 11)\n• Stress test cold-start & modul XAI (Prompt 12–13)",
            "Sedang Berjalan\n(On-going Finalisasi)"
        ],
        [
            "Farrel Ghufran Rahman\n(NIM. 2411521009)",
            "Model Evaluation, Quality Assurance, & MLOps Specialist",
            "Fase 4:\n• Stratified 5-Fold Cross Validation (Prompt 14)\n• Visualisasi kurva metrik Hit@3 & MRR (Prompt 15)\n• Serialisasi pipeline ke .joblib (Prompt 16)\n• Reload test & benchmark latensi NFR (Prompt 17)",
            "Sedang Berjalan\n(On-going Finalisasi)"
        ]
    ]
    tbl_4 = doc.add_table(rows=1, cols=4)
    style_table(tbl_4, table_4_widths, table_4_headers, table_4_data)

    add_heading_2("4.2 Progres & Bukti Kontribusi Nyata Masing-Masing Anggota")
    add_body("Setiap anggota tim menunjukkan kontribusi konkret terhadap artefak proyek yang dapat diverifikasi secara transparan pada repositori GitHub dan buku kerja Google Colab:")
    add_bullet("Kontribusi Fuadi Dhiyaulhaq: Berhasil menyelesaikan 100% pekerjaan Fase 1 dan Fase 2 (Cell 0 s/d Cell 24 pada notebook). Menuntaskan kanonikalisasi nama 17 dosen tetap aktif, memfilter 568 skripsi sah, menyusun kamus DSI_ACADEMIC_STOPWORDS, serta menyusun kerangka metodologis CRISP-ML(Q).")
    add_bullet("Kontribusi Rafa Gian Atthari: Memimpin implementasi Fase 3 dalam membangun representasi ruang vektor semantik TF-IDF N-gram bersama, merumuskan kode algoritma Dynamic Late-Fusion adaptif, serta mengonstruksi modul Explainable AI untuk ekstraksi kata kunci dan rujukan artikel ilmiah dosen.")
    add_bullet("Kontribusi Farrel Ghufran Rahman: Memimpin implementasi Fase 4 dalam menyiapkan pengujian validasi silang Stratified 5-Fold CV tanpa kebocoran data (data leakage), menyusun skrip visualisasi kurva evaluasi metrik, serta mengemas bundel model ke dalam berkas biner mandiri si_rekta_pipeline.joblib.")

    add_heading_2("4.3 Pola Koordinasi Tim Menghadapi Pekerjaan & Kendala yang Saling Berkaitan")
    add_body("Mengingat pengembangan model pembelajaran mesin memiliki sifat dependensi sekuensial (data yang bersih harus tersedia sebelum ekstraksi fitur dan pemodelan dapat dilatih), tim menerapkan mekanisme koordinasi kerja yang ketat:")
    add_bullet("Standarisasi Prompt Modular: Setiap anggota mengeksekusi prompt yang terisolasi dengan prinsip 1 Sel Markdown + 1 Sel Kode Python + 1 Output Tunggal, mencegah terjadinya tumpang tindih variabel global di Google Colab.")
    add_bullet("Disiplin Larangan Fitur Auto-AI Colab: Tim menyepakati aturan bersama untuk tidak menggunakan fitur auto-generate AI bawaan Google Colab secara langsung guna mencegah terhapusnya kode atau terjadinya inkonsistensi fungsi global.")
    add_bullet("Sinkronisasi Daring & Repositori Git: Tim menggunakan repositori GitHub terpusat dan grup koordinasi daring untuk memantau status penyelesaian setiap sel sebelum tahap berikutnya dijalankan.")

    doc.add_page_break()

    # ==============================================================================
    # 9. LAMPIRAN
    # ==============================================================================
    add_heading_1("LAMPIRAN")

    add_heading_2("Lampiran 1: Tautan Ekosistem Repositori GitHub & Google Colab Realtime")
    add_body("Seluruh artefak kode, dataset, dan dokumentasi proyek dapat diakses publik melalui tautan berikut:")
    add_bullet("Repositori Utama GitHub: https://github.com/accfd/SI-REKTA")
    add_bullet("Google Colab Notebook Realtime: https://colab.research.google.com/drive/1wxg3qMF81WH9fQY16obTXagDF0Ql383G")
    add_bullet("Panduan Master Prompt Model IPYNB: https://github.com/accfd/SI-REKTA/blob/main/docs/Panduan_Prompt_Model_IPYNB.md")
    add_bullet("Dokumen Systematic Literature Review (SLR): https://github.com/accfd/SI-REKTA/blob/main/docs/SI-REKTA_SLR.md")
    add_bullet("Dokumen Penjaminan Mutu CRISP-ML(Q): https://github.com/accfd/SI-REKTA/blob/main/docs/SI-REKTA_CRISP_ML_Q.md")
    add_bullet("Dokumen Product Requirements Document (PRD): https://github.com/accfd/SI-REKTA/blob/main/docs/SI-REKTA_PRD.md")

    add_heading_2("Lampiran 2: Tangkapan Layar Lengkap Eksekusi Notebook Google Colab")
    add_placeholder_box("[Letakkan Tangkapan Layar Lengkap Eksekusi Notebook Google Colab dari Cell 0 hingga Cell 24 di Sini]")

    add_heading_2("Lampiran 3: Cuplikan Kode Kunci Preprocessing Teks dan Canonical Name Mapping")
    add_body("Berikut adalah cuplikan kode Python kunci untuk fungsi kanonikalisasi nama dosen dan penyaringan kata henti akademik DSI:")

    p_code = doc.add_paragraph()
    p_code.paragraph_format.line_spacing = 1.0
    p_code.paragraph_format.space_before = Pt(4)
    p_code.paragraph_format.space_after = Pt(4)
    p_code.paragraph_format.first_line_indent = Cm(0)
    r_code = p_code.add_run(
        "# 1. Ekstraksi Whitelist 17 Dosen Tetap Aktif dari Dataset 2\n"
        "whitelist_17_dosen = sorted(df_publikasi['nama_dosen'].dropna().unique())\n\n"
        "# 2. Fungsi Normalisasi String Nama Dosen\n"
        "def clean_name_key(text):\n"
        "    if not isinstance(text, str): return ''\n"
        "    text = re.sub(r'\\b(prof|dr|eng|m\\.eng|m\\.kom|m\\.sc|m\\.t|s\\.t|ph\\.d|s\\.kom|m\\.info|tech|s\\.pd)\\b', '', text, flags=re.IGNORECASE)\n"
        "    text = re.sub(r'[^a-zA-Z\\s]', ' ', text)\n"
        "    text = text.lower().replace('ramadoni', 'rahmadoni').replace('nirad', 'nirfalinda')\n"
        "    return ' '.join(text.split())\n\n"
        "# 3. Formula Dynamic Late-Fusion Perankingan Dosen\n"
        "def compute_late_fusion_score(score_skripsi, score_publikasi, alpha):\n"
        "    return (alpha * score_skripsi) + ((1.0 - alpha) * score_publikasi)"
    )
    r_code.font.name = 'Courier New'
    r_code.font.size = Pt(10)

    # Save Document
    output_filename = "Progress_Report_1_SI-REKTA.docx"
    doc.save(output_filename)
    print(f"Document successfully created and saved as: {output_filename}")

if __name__ == "__main__":
    create_progress_report()
