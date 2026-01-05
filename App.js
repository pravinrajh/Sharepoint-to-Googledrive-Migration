import React, { useState, useEffect } from 'react';
import { Search, Upload, FolderOpen, FileText, Image, File, Download, Share2, MoreVertical, Grid, List, Filter, Calendar, User, BarChart, DollarSign, Package, Clipboard, Users, FileSpreadsheet } from 'lucide-react';

// Mock SharePoint REST API data with MIPL Group specific documents
const mockSharePointData = [
    {
        id: 1,
        name: "MIPL_Master_Project_Database.xlsx",
        type: "Excel",
        modified: "2026-01-02T10:30:00",
        modifiedBy: "Kamesh",
        size: "4.2 MB",
        path: "/01.Project/01.Master Data Folder",
        permissions: ["Read", "Write"],
        icon: FileSpreadsheet,
        category: "Project Management",
        department: "Projects",
        owner: "PC1"
    },
    {
        id: 2,
        name: "FIN002_Accounts-Checklist-2.0.xlsx",
        type: "Excel",
        modified: "2025-12-28T14:15:00",
        modifiedBy: "Sathish",
        size: "3.8 MB",
        path: "/06.Finance",
        permissions: ["Read"],
        icon: FileSpreadsheet,
        category: "Finance MIS",
        department: "Finance",
        owner: "Finance"
    },
    {
        id: 3,
        name: "Tender_Quote-Master_Sheet.xlsx",
        type: "Excel",
        modified: "2026-01-01T09:45:00",
        modifiedBy: "Anzil",
        size: "5.6 MB",
        path: "/04.Techno commercial & Tender/02.Tender Quotes",
        permissions: ["Read", "Write"],
        icon: FileSpreadsheet,
        category: "Tender Management",
        department: "Tender",
        owner: "MD"
    },
    {
        id: 4,
        name: "MS005_Master_PO_Sheet_1.0.xlsx",
        type: "Excel",
        modified: "2025-12-30T16:20:00",
        modifiedBy: "Deepak",
        size: "6.3 MB",
        path: "/01.Project/01.Master Data Folder/04.POWO Generation",
        permissions: ["Read", "Write"],
        icon: FileSpreadsheet,
        category: "Procurement",
        department: "Projects",
        owner: "PC1"
    },
    {
        id: 5,
        name: "Vendor_Bill_Processing_3.0.pdf",
        type: "PDF",
        modified: "2025-12-29T11:10:00",
        modifiedBy: "Sathish",
        size: "2.1 MB",
        path: "/06.Finance/Vendor Bill Processing",
        permissions: ["Read"],
        icon: File,
        category: "Finance MIS",
        department: "Finance",
        owner: "Finance"
    },
    {
        id: 6,
        name: "Tender_FMS_3.0.xlsx",
        type: "Excel",
        modified: "2025-12-31T13:30:00",
        modifiedBy: "Anzil",
        size: "4.9 MB",
        path: "/04.Techno commercial & Tender/01.Tender FMS",
        permissions: ["Read", "Write"],
        icon: FileSpreadsheet,
        category: "Tender Management",
        department: "Tender",
        owner: "MD"
    },
    {
        id: 7,
        name: "Purchase_Analysis_Dashboard.xlsx",
        type: "Excel",
        modified: "2025-12-27T08:45:00",
        modifiedBy: "Deepak",
        size: "3.5 MB",
        path: "/05.Purchase",
        permissions: ["Read", "Write"],
        icon: FileSpreadsheet,
        category: "Procurement",
        department: "Procurement",
        owner: "PC1"
    },
    {
        id: 8,
        name: "MIPL_Project_Execution_Documents.pdf",
        type: "PDF",
        modified: "2026-01-02T09:15:00",
        modifiedBy: "Kamesh",
        size: "8.2 MB",
        path: "/01.Project",
        permissions: ["Read"],
        icon: File,
        category: "Project Management",
        department: "Projects",
        owner: "PC1"
    },
    {
        id: 9,
        name: "MS005_Master_GRN_Data.xlsx",
        type: "Excel",
        modified: "2025-12-26T15:40:00",
        modifiedBy: "Pravin",
        size: "4.7 MB",
        path: "/01.Project/01.Master Data Folder/04.POWO Generation",
        permissions: ["Read", "Write"],
        icon: FileSpreadsheet,
        category: "Procurement",
        department: "Projects",
        owner: "PC1"
    },
    {
        id: 10,
        name: "FIN001_Vendor_Cheque_Processing_3.0.xlsx",
        type: "Excel",
        modified: "2025-12-24T12:25:00",
        modifiedBy: "Sathish",
        size: "3.2 MB",
        path: "/06.Finance/Vendor Cheque",
        permissions: ["Read"],
        icon: FileSpreadsheet,
        category: "Finance MIS",
        department: "Finance",
        owner: "Finance"
    },
    {
        id: 11,
        name: "TC001_Tender_Status_Master.xlsx",
        type: "Excel",
        modified: "2026-01-01T17:50:00",
        modifiedBy: "Anzil",
        size: "5.1 MB",
        path: "/04.Techno commercial & Tender",
        permissions: ["Read", "Write"],
        icon: FileSpreadsheet,
        category: "Tender Management",
        department: "Tender",
        owner: "MD"
    },
    {
        id: 12,
        name: "MIPL_All_Documents_Index.xlsx",
        type: "Excel",
        modified: "2026-01-02T14:00:00",
        modifiedBy: "Kamesh",
        size: "7.8 MB",
        path: "/",
        permissions: ["Read", "Write"],
        icon: FileSpreadsheet,
        category: "ALL File",
        department: "ALL",
        owner: "MIPL"
    },
    {
        id: 13,
        name: "Procurement_PO_Finance_Reference.xlsx",
        type: "Excel",
        modified: "2025-12-23T10:15:00",
        modifiedBy: "Deepak",
        size: "4.4 MB",
        path: "/06.Finance/Procurement PO for Finance Reference",
        permissions: ["Read"],
        icon: FileSpreadsheet,
        category: "Procurement",
        department: "Finance",
        owner: "Finance"
    },
    {
        id: 14,
        name: "Tender_Quote-Entry_Sheet.xlsx",
        type: "Excel",
        modified: "2025-12-30T09:30:00",
        modifiedBy: "Anzil",
        size: "3.9 MB",
        path: "/04.Techno commercial & Tender/02.Tender Quotes",
        permissions: ["Read", "Write"],
        icon: FileSpreadsheet,
        category: "Tender Management",
        department: "Tender",
        owner: "MD"
    },
    {
        id: 15,
        name: "MIPL_Project_Master_Schedule.xlsx",
        type: "Excel",
        modified: "2026-01-02T11:45:00",
        modifiedBy: "Kamesh",
        size: "6.5 MB",
        path: "/01.Project/01.Master Data Folder/09.Master Project Scheduling",
        permissions: ["Read", "Write"],
        icon: FileSpreadsheet,
        category: "Project Management",
        department: "Projects",
        owner: "PC1"
    },
    {
        id: 16,
        name: "MIPL_Strategic_Plan_2024.xlsx",
        type: "Excel",
        modified: "2024-05-15T10:00:00",
        modifiedBy: "Kamesh",
        size: "3.5 MB",
        path: "/01.Project/Strategy",
        permissions: ["Read", "Write"],
        icon: FileSpreadsheet,
        category: "Project Management",
        department: "Projects",
        owner: "PC1"
    },
    {
        id: 17,
        name: "Finance_YearEnd_2024.xlsx",
        type: "Excel",
        modified: "2024-12-31T16:00:00",
        modifiedBy: "Sathish",
        size: "5.2 MB",
        path: "/06.Finance/YearEnd",
        permissions: ["Read"],
        icon: FileSpreadsheet,
        category: "Finance MIS",
        department: "Finance",
        owner: "Finance"
    },
    {
        id: 18,
        name: "Tender_Submission_2026.docx",
        type: "Word",
        modified: "2026-01-02T09:30:00",
        modifiedBy: "Anzil",
        size: "2.8 MB",
        path: "/04.Techno commercial & Tender/2026",
        permissions: ["Read", "Write"],
        icon: FileText,
        category: "Tender Management",
        department: "Tender",
        owner: "MD"
    },
    {
        id: 19,
        name: "Procurement_Vendor_List_2024.xlsx",
        type: "Excel",
        modified: "2024-08-20T14:15:00",
        modifiedBy: "Pravin",
        size: "1.9 MB",
        path: "/05.Purchase/Vendors",
        permissions: ["Read", "Write"],
        icon: FileSpreadsheet,
        category: "Procurement",
        department: "Procurement",
        owner: "PC1"
    },
    {
        id: 20,
        name: "MIPL_Policy_Update_2026.pdf",
        type: "PDF",
        modified: "2026-01-02T11:00:00",
        modifiedBy: "Deepak",
        size: "4.1 MB",
        path: "/01.MIPL/Policies",
        permissions: ["Read"],
        icon: File,
        category: "ALL File",
        department: "ALL",
        owner: "MIPL"
    }
];

const App = () => {
    const [documents, setDocuments] = useState([]);
    const [filteredDocs, setFilteredDocs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [viewMode, setViewMode] = useState('list');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedDepartment, setSelectedDepartment] = useState('All');
    const [selectedOwner, setSelectedOwner] = useState('All');
    const [sortBy, setSortBy] = useState('modified');
    const [migrationStatus, setMigrationStatus] = useState({
        total: 0,
        migrated: 0,
        failed: 0,
        inProgress: false
    });

    useEffect(() => {
        // Simulate API fetch from SharePoint REST API
        setDocuments(mockSharePointData);
        setFilteredDocs(mockSharePointData);
    }, []);

    useEffect(() => {
        let filtered = documents.filter(doc =>
            doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            doc.modifiedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
            doc.path.toLowerCase().includes(searchTerm.toLowerCase()) ||
            doc.category.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (selectedCategory !== 'All') {
            filtered = filtered.filter(doc => doc.category === selectedCategory);
        }

        if (selectedDepartment !== 'All') {
            filtered = filtered.filter(doc => doc.department === selectedDepartment);
        }

        if (selectedOwner !== 'All') {
            filtered = filtered.filter(doc => doc.owner === selectedOwner);
        }

        // Sort documents
        filtered.sort((a, b) => {
            if (sortBy === 'modified') {
                return new Date(b.modified) - new Date(a.modified);
            } else if (sortBy === 'name') {
                return a.name.localeCompare(b.name);
            } else if (sortBy === 'size') {
                return parseFloat(b.size) - parseFloat(a.size);
            } else if (sortBy === 'department') {
                return a.department.localeCompare(b.department);
            }
            return 0;
        });

        setFilteredDocs(filtered);
    }, [searchTerm, documents, selectedCategory, selectedDepartment, selectedOwner, sortBy]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getTypeIcon = (type) => {
        const iconMap = {
            Excel: FileSpreadsheet,
            Word: FileText,
            PowerPoint: FileText,
            Image: Image,
            PDF: File
        };
        return iconMap[type] || File;
    };

    const getCategoryIcon = (category) => {
        const iconMap = {
            'Project Management': Clipboard,
            'Finance MIS': DollarSign,
            'Tender Management': BarChart,
            'Procurement': Package,
            'ALL File': FileSpreadsheet
        };
        return iconMap[category] || File;
    };

    const getDepartmentIcon = (department) => {
        const iconMap = {
            'Projects': FolderOpen,
            'Finance': DollarSign,
            'Tender': BarChart,
            'Procurement': Package,
            'ALL': Users
        };
        return iconMap[department] || Users;
    };

    const startMigration = () => {
        setMigrationStatus({
            total: documents.length,
            migrated: 0,
            failed: 0,
            inProgress: true
        });

        // Simulate migration progress
        let migrated = 0;
        const interval = setInterval(() => {
            migrated++;
            setMigrationStatus(prev => ({
                ...prev,
                migrated: migrated,
                inProgress: migrated < documents.length
            }));

            if (migrated >= documents.length) {
                clearInterval(interval);
                // Show completion message
                setTimeout(() => {
                    alert(`✅ Migration completed successfully!\n\nMigrated: ${documents.length} files\nPath: My Drive/01.MIPL\nDate: ${new Date().toLocaleDateString()}`);
                }, 500);
            }
        }, 800);
    };

    const uniqueCategories = ['All', ...new Set(documents.map(doc => doc.category))];
    const uniqueDepartments = ['All', ...new Set(documents.map(doc => doc.department))];
    const uniqueOwners = ['All', ...new Set(documents.map(doc => doc.owner))];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
            {/* Header */}
            <header className="bg-gradient-to-r from-blue-700 to-blue-800 text-white shadow-lg sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 py-5">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex items-center space-x-3">
                            <div className="bg-white p-2 rounded-lg">
                                <FolderOpen className="w-7 h-7 text-blue-700" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold">MIPL SharePoint Document Library</h1>
                                <p className="text-blue-200 text-sm">Migration to Google Workspace | {documents.length} business documents</p>
                            </div>
                        </div>
                        <button
                            onClick={startMigration}
                            disabled={migrationStatus.inProgress}
                            className="px-6 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-300 flex items-center space-x-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                        >
                            <Upload className="w-4 h-4" />
                            <span className="font-medium">
                                {migrationStatus.inProgress ? 'Migrating...' : 'Migrate to Google Drive'}
                            </span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Migration Progress */}
            {migrationStatus.inProgress && (
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-emerald-200 rounded-xl p-5 shadow-sm">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-3">
                                <div className="bg-emerald-100 p-2 rounded-lg">
                                    <Upload className="w-5 h-5 text-emerald-600" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-emerald-900">Migration to Google Drive</h3>
                                    <p className="text-sm text-emerald-700">
                                        My Drive/01.MIPL • {migrationStatus.migrated}/{migrationStatus.total} files
                                    </p>
                                </div>
                            </div>
                            <span className="text-lg font-bold text-emerald-700">
                                {Math.round((migrationStatus.migrated / migrationStatus.total) * 100)}%
                            </span>
                        </div>
                        <div className="w-full bg-emerald-200 rounded-full h-2.5">
                            <div
                                className="bg-gradient-to-r from-emerald-500 to-green-500 h-2.5 rounded-full transition-all duration-500"
                                style={{ width: `${(migrationStatus.migrated / migrationStatus.total) * 100}%` }}
                            />
                        </div>
                        <div className="mt-2 flex justify-between text-xs text-emerald-600">
                            <span>SharePoint Online</span>
                            <span>Google Drive</span>
                        </div>
                    </div>
                </div>
            )}

            {/* Stats Summary */}
            <div className="max-w-7xl mx-auto px-4 py-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    <div className="bg-white rounded-lg p-4 shadow-sm border border-blue-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">Total Documents</p>
                                <p className="text-2xl font-bold text-blue-700">{documents.length}</p>
                            </div>
                            <FileSpreadsheet className="w-8 h-8 text-blue-500" />
                        </div>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm border border-green-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">Project Files</p>
                                <p className="text-2xl font-bold text-green-700">{documents.filter(d => d.department === 'Projects').length}</p>
                            </div>
                            <Clipboard className="w-8 h-8 text-green-500" />
                        </div>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm border border-purple-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">Finance Files</p>
                                <p className="text-2xl font-bold text-purple-700">{documents.filter(d => d.department === 'Finance').length}</p>
                            </div>
                            <DollarSign className="w-8 h-8 text-purple-500" />
                        </div>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm border border-orange-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">Tender Files</p>
                                <p className="text-2xl font-bold text-orange-700">{documents.filter(d => d.department === 'Tender').length}</p>
                            </div>
                            <BarChart className="w-8 h-8 text-orange-500" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Toolbar */}
            <div className="max-w-7xl mx-auto px-4 py-4">
                <div className="bg-white rounded-xl shadow-sm p-5 space-y-5">
                    {/* Search Bar */}
                    <div className="flex flex-col lg:flex-row gap-4">
                        <div className="flex-1">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Search documents by name, owner, or path..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-3 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-lg"
                                />
                            </div>
                        </div>

                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-3 rounded-xl transition-all ${viewMode === 'list' ? 'bg-blue-100 text-blue-600 shadow-inner' : 'text-gray-600 hover:bg-gray-100 hover:shadow'}`}
                            >
                                <List className="w-6 h-6" />
                            </button>
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-3 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600 shadow-inner' : 'text-gray-600 hover:bg-gray-100 hover:shadow'}`}
                            >
                                <Grid className="w-6 h-6" />
                            </button>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="space-y-2">
                            <label className="flex items-center text-sm font-medium text-gray-700">
                                <Filter className="w-4 h-4 mr-2" />
                                Category
                            </label>
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                            >
                                {uniqueCategories.map(category => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="flex items-center text-sm font-medium text-gray-700">
                                <Users className="w-4 h-4 mr-2" />
                                Department
                            </label>
                            <select
                                value={selectedDepartment}
                                onChange={(e) => setSelectedDepartment(e.target.value)}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                            >
                                {uniqueDepartments.map(dept => (
                                    <option key={dept} value={dept}>{dept}</option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="flex items-center text-sm font-medium text-gray-700">
                                <User className="w-4 h-4 mr-2" />
                                Owner
                            </label>
                            <select
                                value={selectedOwner}
                                onChange={(e) => setSelectedOwner(e.target.value)}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                            >
                                {uniqueOwners.map(owner => (
                                    <option key={owner} value={owner}>{owner}</option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="flex items-center text-sm font-medium text-gray-700">
                                <Calendar className="w-4 h-4 mr-2" />
                                Sort By
                            </label>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
                            >
                                <option value="modified">Modified Date</option>
                                <option value="name">Name</option>
                                <option value="size">Size</option>
                                <option value="department">Department</option>
                            </select>
                        </div>
                    </div>

                    {/* Active Filters */}
                    {(selectedCategory !== 'All' || selectedDepartment !== 'All' || selectedOwner !== 'All' || searchTerm) && (
                        <div className="flex flex-wrap items-center gap-2 p-3 bg-blue-50 rounded-lg">
                            <span className="text-sm text-blue-700">Active filters:</span>
                            {selectedCategory !== 'All' && (
                                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full flex items-center">
                                    {selectedCategory} ×
                                </span>
                            )}
                            {selectedDepartment !== 'All' && (
                                <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full flex items-center">
                                    {selectedDepartment} ×
                                </span>
                            )}
                            {selectedOwner !== 'All' && (
                                <span className="px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full flex items-center">
                                    {selectedOwner} ×
                                </span>
                            )}
                            {searchTerm && (
                                <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full flex items-center">
                                    "{searchTerm}" ×
                                </span>
                            )}
                            <button
                                onClick={() => {
                                    setSelectedCategory('All');
                                    setSelectedDepartment('All');
                                    setSelectedOwner('All');
                                    setSearchTerm('');
                                }}
                                className="ml-auto text-sm text-blue-600 hover:text-blue-800"
                            >
                                Clear all
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Document List/Grid */}
            <div className="max-w-7xl mx-auto px-4 pb-10">
                {viewMode === 'list' ? (
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                                <tr>
                                    <th className="px-7 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                        Document Details
                                    </th>
                                    <th className="px-7 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                        Modified
                                    </th>
                                    <th className="px-7 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                        Department & Owner
                                    </th>
                                    <th className="px-7 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                        Size
                                    </th>
                                    <th className="px-7 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredDocs.map((doc) => {
                                    const IconComponent = getTypeIcon(doc.type);
                                    const CategoryIcon = getCategoryIcon(doc.category);
                                    const DeptIcon = getDepartmentIcon(doc.department);
                                    return (
                                        <tr key={doc.id} className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-25 transition-all duration-200">
                                            <td className="px-7 py-5">
                                                <div className="flex items-start">
                                                    <div className="flex-shrink-0">
                                                        <div className="p-3 bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl">
                                                            <IconComponent className="w-7 h-7 text-blue-600" />
                                                        </div>
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="flex items-center space-x-2 mb-1">
                                                            <CategoryIcon className="w-4 h-4 text-gray-400" />
                                                            <span className="text-xs font-medium px-2 py-0.5 bg-gray-100 text-gray-600 rounded">
                                                                {doc.category}
                                                            </span>
                                                        </div>
                                                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{doc.name}</h3>
                                                        <div className="flex items-center text-sm text-gray-500">
                                                            <FolderOpen className="w-4 h-4 mr-1" />
                                                            {doc.path}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-7 py-5">
                                                <div className="space-y-1">
                                                    <div className="flex items-center text-sm text-gray-900 font-medium">
                                                        <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                                                        {formatDate(doc.modified)}
                                                    </div>
                                                    <div className="flex items-center text-sm text-gray-500">
                                                        <User className="w-4 h-4 mr-1" />
                                                        {doc.modifiedBy}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-7 py-5">
                                                <div className="space-y-2">
                                                    <div className="flex items-center">
                                                        <DeptIcon className="w-4 h-4 mr-2 text-gray-400" />
                                                        <span className="text-sm font-medium text-gray-700">{doc.department}</span>
                                                    </div>
                                                    <div className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-blue-50 to-blue-100 rounded-full">
                                                        <span className="text-xs font-semibold text-blue-700">{doc.owner}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-7 py-5">
                                                <span className="inline-flex items-center px-3 py-1.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-full">
                                                    {doc.size}
                                                </span>
                                            </td>
                                            <td className="px-7 py-5">
                                                <div className="flex items-center space-x-3">
                                                    <button className="p-2 bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 rounded-lg transition-all duration-300 group" title="Migrate">
                                                        <Upload className="w-5 h-5 text-blue-600 group-hover:text-blue-800" />
                                                    </button>
                                                    <button className="p-2 bg-gradient-to-r from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 rounded-lg transition-all duration-300 group" title="Download">
                                                        <Download className="w-5 h-5 text-green-600 group-hover:text-green-800" />
                                                    </button>
                                                    <button className="p-2 bg-gradient-to-r from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 rounded-lg transition-all duration-300 group" title="Share">
                                                        <Share2 className="w-5 h-5 text-purple-600 group-hover:text-purple-800" />
                                                    </button>
                                                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-300">
                                                        <MoreVertical className="w-5 h-5 text-gray-400" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {filteredDocs.map((doc) => {
                            const IconComponent = getTypeIcon(doc.type);
                            const CategoryIcon = getCategoryIcon(doc.category);
                            const DeptIcon = getDepartmentIcon(doc.department);
                            return (
                                <div
                                    key={doc.id}
                                    className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-blue-300 overflow-hidden group"
                                >
                                    <div className="p-5">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex items-center space-x-3">
                                                <div className="p-3 bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl">
                                                    <IconComponent className="w-7 h-7 text-blue-600" />
                                                </div>
                                                <div>
                                                    <div className="flex items-center space-x-1 mb-1">
                                                        <CategoryIcon className="w-3 h-3 text-gray-400" />
                                                        <span className="text-xs font-medium text-gray-500">{doc.category}</span>
                                                    </div>
                                                    <div className="flex items-center space-x-1">
                                                        <DeptIcon className="w-3 h-3 text-gray-400" />
                                                        <span className="text-xs font-medium text-gray-500">{doc.department}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <button className="p-2 hover:bg-gray-100 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                                <MoreVertical className="w-5 h-5 text-gray-400" />
                                            </button>
                                        </div>

                                        <h3 className="font-semibold text-gray-900 mb-3 line-clamp-2 text-lg" title={doc.name}>
                                            {doc.name}
                                        </h3>

                                        <div className="space-y-2 text-sm text-gray-600 mb-4">
                                            <div className="flex items-center">
                                                <FolderOpen className="w-4 h-4 mr-2 text-gray-400" />
                                                <span className="truncate">{doc.path}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                                                <span>{formatDate(doc.modified)}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <User className="w-4 h-4 mr-2 text-gray-400" />
                                                <span className="font-medium">{doc.modifiedBy}</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between mb-4">
                                            <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-full">
                                                {doc.size}
                                            </span>
                                            <span className="px-3 py-1 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 text-sm font-semibold rounded-full">
                                                {doc.owner}
                                            </span>
                                        </div>

                                        <div className="flex items-center space-x-2 pt-4 border-t border-gray-100">
                                            <button className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow hover:shadow-md">
                                                Migrate
                                            </button>
                                            <button className="p-2.5 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors" title="Share">
                                                <Share2 className="w-5 h-5 text-gray-600" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {filteredDocs.length === 0 && (
                    <div className="bg-white rounded-xl shadow-sm p-16 text-center">
                        <FileSpreadsheet className="w-20 h-20 text-gray-300 mx-auto mb-6" />
                        <h3 className="text-2xl font-semibold text-gray-900 mb-3">No documents found</h3>
                        <p className="text-gray-500 mb-6">Try adjusting your search criteria or filters</p>
                        <button
                            onClick={() => {
                                setSelectedCategory('All');
                                setSelectedDepartment('All');
                                setSelectedOwner('All');
                                setSearchTerm('');
                            }}
                            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg"
                        >
                            Clear all filters
                        </button>
                    </div>
                )}

                {/* Footer */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                    <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
                        <p>© 2026 MIPL Group. All rights reserved.</p>
                        <div className="flex items-center space-x-6 mt-4 md:mt-0">
                            <a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a>
                            <a href="#" className="hover:text-blue-600 transition-colors">Terms of Service</a>
                            <a href="#" className="hover:text-blue-600 transition-colors">Help Center</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
