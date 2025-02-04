"use client";

import React, { useState, useMemo } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
  Button,
  Input,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalFooter,
  useDisclosure,
  Select,
  SelectItem,
  Textarea,
  Selection,
} from "@nextui-org/react";
import { Edit, Trash2, Search, Plus, Filter } from "lucide-react";

const statusColorMap: Record<string, "success" | "danger" | "warning" | "default" | "primary" | "secondary"> = {
  active: "success",
  inactive: "danger",
  vacation: "warning",
};

const columns = [
  { name: "NAME", uid: "name" },
  { name: "POSITION", uid: "position" },
  { name: "STATUS", uid: "status" },
  { name: "DEPARTMENT", uid: "department" },
  { name: "ACTIONS", uid: "actions" },
];

// Sample administrative staff data
const adminStaff = [
  {
    id: 1,
    name: "Sarah Johnson",
    position: "Hospital Administrator",
    status: "active",
    department: "Administration",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    email: "sarah.johnson@hospital.com",
    phone: "+1234567890",
    responsibilities: "Overall hospital management",
  },
  {
    id: 2,
    name: "Michael Chen",
    position: "HR Manager",
    status: "active",
    department: "Human Resources",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    email: "michael.chen@hospital.com",
    phone: "+1234567891",
    responsibilities: "Staff recruitment and management",
  },
  {
    id: 3,
    name: "Emily Brown",
    position: "Finance Director",
    status: "active",
    department: "Finance",
    avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    email: "emily.brown@hospital.com",
    phone: "+1234567892",
    responsibilities: "Financial planning and management",
  },
];

const POSITIONS = ["All Positions", "Hospital Administrator", "HR Manager", "Finance Director", "Office Manager"];
const DEPARTMENTS = ["All Departments", "Administration", "Human Resources", "Finance", "Operations"];
const STATUS = ["All Status", "Active", "Inactive", "Vacation"];

export default function AdministrativeStaff() {
  const [filterValue, setFilterValue] = useState("");
  const [selectedPosition, setSelectedPosition] = useState<Selection>(new Set(["All Positions"]));
  const [selectedDepartment, setSelectedDepartment] = useState<Selection>(new Set(["All Departments"]));
  const [selectedStatus, setSelectedStatus] = useState<Selection>(new Set(["All Status"]));
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [isEditing, setIsEditing] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<any>(null);
  const [newStaff, setNewStaff] = useState({
    name: '',
    email: '',
    position: '',
    department: '',
    status: 'active',
    phone: '',
    responsibilities: ''
  });

  const hasSearch = Boolean(filterValue);

  const filteredItems = useMemo(() => {
    let filteredStaff = [...adminStaff];

    if (hasSearch) {
      filteredStaff = filteredStaff.filter((staff) =>
        staff.name.toLowerCase().includes(filterValue.toLowerCase()) ||
        staff.email.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    const position = Array.from(selectedPosition)[0] as string;
    if (position && position !== "All Positions") {
      filteredStaff = filteredStaff.filter((staff) => staff.position === position);
    }

    const department = Array.from(selectedDepartment)[0] as string;
    if (department && department !== "All Departments") {
      filteredStaff = filteredStaff.filter((staff) => staff.department === department);
    }

    const status = Array.from(selectedStatus)[0] as string;
    if (status && status !== "All Status") {
      filteredStaff = filteredStaff.filter((staff) => 
        staff.status.toLowerCase() === status.toLowerCase()
      );
    }

    return filteredStaff;
  }, [filterValue, selectedPosition, selectedDepartment, selectedStatus]);

  const handleEdit = (staff: any) => {
    setIsEditing(true);
    setSelectedStaff(staff);
    setNewStaff({
      name: staff.name,
      email: staff.email,
      position: staff.position,
      department: staff.department,
      status: staff.status,
      phone: staff.phone || '',
      responsibilities: staff.responsibilities || ''
    });
    onOpen();
  };

  const handleAddStaff = () => {
    console.log('New Staff Data:', newStaff);
    onClose();
    resetForm();
  };

  const handleUpdate = () => {
    console.log('Updated Staff Data:', newStaff);
    onClose();
    setIsEditing(false);
    setSelectedStaff(null);
    resetForm();
  };

  const resetForm = () => {
    setNewStaff({
      name: '',
      email: '',
      position: '',
      department: '',
      status: 'active',
      phone: '',
      responsibilities: ''
    });
  };

  const renderCell = React.useCallback((staff: any, columnKey: React.Key) => {
    const cellValue = staff[columnKey as keyof typeof staff];

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "lg", src: staff.avatar }}
            description={staff.email}
            name={cellValue}
          >
            {staff.email}
          </User>
        );
      case "position":
      case "department":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{cellValue}</p>
          </div>
        );
      case "status":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[cellValue as keyof typeof statusColorMap]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="flex items-center gap-2">
            <Tooltip content="Edit staff">
              <Button 
                isIconOnly 
                size="sm" 
                variant="light"
                onPress={() => handleEdit(staff)}
              >
                <Edit className="h-4 w-4" />
              </Button>
            </Tooltip>
            <Tooltip content="Delete staff" color="danger">
              <Button isIconOnly size="sm" variant="light" color="danger">
                <Trash2 className="h-4 w-4" />
              </Button>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const renderStaffModal = () => (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          {isEditing ? "Edit Administrative Staff" : "Add Administrative Staff"}
        </ModalHeader>
        <ModalBody>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Full Name"
              placeholder="Enter full name"
              value={newStaff.name}
              onChange={(e) => setNewStaff({...newStaff, name: e.target.value})}
            />
            <Input
              label="Email"
              placeholder="Enter email address"
              type="email"
              value={newStaff.email}
              onChange={(e) => setNewStaff({...newStaff, email: e.target.value})}
            />
            <Select
              label="Position"
              placeholder="Select position"
              selectedKeys={[newStaff.position]}
              onChange={(e) => setNewStaff({...newStaff, position: e.target.value})}
            >
              {POSITIONS.filter(pos => pos !== "All Positions").map((pos) => (
                <SelectItem key={pos} value={pos}>
                  {pos}
                </SelectItem>
              ))}
            </Select>
            <Select
              label="Department"
              placeholder="Select department"
              selectedKeys={[newStaff.department]}
              onChange={(e) => setNewStaff({...newStaff, department: e.target.value})}
            >
              {DEPARTMENTS.filter(dept => dept !== "All Departments").map((dept) => (
                <SelectItem key={dept} value={dept}>
                  {dept}
                </SelectItem>
              ))}
            </Select>
            <Select
              label="Status"
              placeholder="Select status"
              selectedKeys={[newStaff.status]}
              onChange={(e) => setNewStaff({...newStaff, status: e.target.value})}
            >
              {STATUS.filter(status => status !== "All Status").map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </Select>
            <Input
              label="Phone Number"
              placeholder="Enter phone number"
              value={newStaff.phone}
              onChange={(e) => setNewStaff({...newStaff, phone: e.target.value})}
            />
            <div className="col-span-2">
              <Textarea
                label="Responsibilities"
                placeholder="Enter staff responsibilities"
                value={newStaff.responsibilities}
                onChange={(e) => setNewStaff({...newStaff, responsibilities: e.target.value})}
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={onClose}>
            Cancel
          </Button>
          <Button 
            color="primary" 
            onPress={isEditing ? handleUpdate : handleAddStaff}
          >
            {isEditing ? "Update Staff" : "Add Staff"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );

  return (
    <div className="w-full">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name..."
            startContent={<Search className="h-4 w-4" />}
            value={filterValue}
            onValueChange={setFilterValue}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger>
                <Button 
                  variant="flat" 
                  startContent={<Filter className="h-4 w-4" />}
                >
                  Position
                </Button>
              </DropdownTrigger>
              <DropdownMenu 
                disallowEmptySelection
                aria-label="Position Filter"
                selectedKeys={selectedPosition}
                selectionMode="single"
                onSelectionChange={setSelectedPosition}
              >
                {POSITIONS.map((position) => (
                  <DropdownItem key={position}>{position}</DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>

            <Dropdown>
              <DropdownTrigger>
                <Button 
                  variant="flat" 
                  startContent={<Filter className="h-4 w-4" />}
                >
                  Department
                </Button>
              </DropdownTrigger>
              <DropdownMenu 
                disallowEmptySelection
                aria-label="Department Filter"
                selectedKeys={selectedDepartment}
                selectionMode="single"
                onSelectionChange={setSelectedDepartment}
              >
                {DEPARTMENTS.map((dept) => (
                  <DropdownItem key={dept}>{dept}</DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>

            <Dropdown>
              <DropdownTrigger>
                <Button 
                  variant="flat" 
                  startContent={<Filter className="h-4 w-4" />}
                >
                  Status
                </Button>
              </DropdownTrigger>
              <DropdownMenu 
                disallowEmptySelection
                aria-label="Status Filter"
                selectedKeys={selectedStatus}
                selectionMode="single"
                onSelectionChange={setSelectedStatus}
              >
                {STATUS.map((status) => (
                  <DropdownItem key={status}>{status}</DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>

            <Button color="primary" startContent={<Plus className="h-4 w-4" />} onPress={onOpen}>
              Add Administrative Staff
            </Button>
          </div>
        </div>

        <Table aria-label="Administrative staff table">
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn 
                key={column.uid}
                align={column.uid === "actions" ? "center" : "start"}
              >
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody items={filteredItems}>
            {(item) => (
              <TableRow key={item.id}>
                {(columnKey) => (
                  <TableCell>{renderCell(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {renderStaffModal()}
    </div>
  );
}