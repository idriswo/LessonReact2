import { useAtom } from 'jotai'
import { memo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useStore } from 'zustand'
import { addUserJotai, atomAddress, atomRole, atomStatus, atomUser, editUserJotai } from '../jotai/dataJotai'
import { addUser, deleteUserR, editUser, inputName, inputSurname } from '../reducer/dataSlice'
import type { RootState } from '../store/store'
import { dataZustand } from '../zustand/zustand'

interface UserType {
    id: number;
    name: string;
    surname: string;
    age?: string ;
    job?: string;
    address?: string;
    role?: string;
    status?: boolean | string;
}

import { Edit2, Plus, Search, Trash2 } from "lucide-react"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Checkbox } from "../components/ui/checkbox"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog"
import { Input } from "../components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"

const CrudRZJ = memo(() => {
    const dataR = useSelector(({ dataRtk }: RootState) => dataRtk.data)
    const dataZ = useStore(dataZustand)
    const [dataJ, setDataJ] = useAtom(atomUser)
    const [status, setStatus] = useAtom(atomStatus)
    const [role, setRole] = useAtom(atomRole)
    const [address, setAddress] = useAtom(atomAddress)
    const [, addUserJ] = useAtom(addUserJotai)
    const [, editUserJ] = useAtom(editUserJotai)

    const name = useSelector(({ dataRtk }: RootState) => dataRtk.name)
    const surname = useSelector(({ dataRtk }: RootState) => dataRtk.surname)
    const dispatch = useDispatch()

    const [editModalOpen, setEditModalOpen] = useState(false);
    const [editId, setEditId] = useState<number | null>(null);
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [searchText, setSearchText] = useState("");

    const handledelete = (id: number) => {
        dispatch(deleteUserR(id))
    }

    const handleAdd = () => {
        const id = Date.now();
        dispatch(addUser(id));
        dataZ.addUserZ(id);
        addUserJ(id);
        setRole("");
        setAddress("");
        setStatus(false);
        dispatch(inputName(""));
        dispatch(inputSurname(""));
        dataZ.inputAge("");
        dataZ.inputJob("");
        setAddModalOpen(false);
    }

    const handleEditClick = (user: UserType) => {
        setEditId(user.id);
        dispatch(inputName(user.name));
        dispatch(inputSurname(user.surname));
        dataZ.inputAge(user.age);
        dataZ.inputJob(user.job);
        setAddress(user.address);
        setRole(user.role);
        setStatus(user.status === true || user.status === 'true');
        setEditModalOpen(true);
    }

    const handleSaveEdit = () => {
        if (editId !== null) {
            dispatch(editUser(editId));
            dataZ.editUserZ(editId);
            editUserJ(editId);
            setEditModalOpen(false);
            setEditId(null);
        }
    }
    
    const data = dataR.map((userR) => {
        const userZ = dataZ.data.find((z) => z.id === userR.id);
        const userJ = dataJ.find((j) => j.id === userR.id);
        return { ...userR, ...userZ, ...userJ };
    });

    const filteredData = data.filter((user: UserType) => (user.name || "").toLowerCase().includes(searchText.toLowerCase()));

    return (
        <div className="min-h-screen bg-slate-50/50 p-6 md:p-10 font-sans text-slate-900">
            <div className="max-w-6xl mx-auto space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-slate-900">User Crud</h1>
                    </div>
                    
                    <Dialog open={addModalOpen} onOpenChange={setAddModalOpen}>
                        <DialogTrigger >
                            <Button className="gap-2"><Plus className="h-4 w-4" /> Add New User</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px]">
                            <DialogHeader>
                                <DialogTitle>Add New User</DialogTitle>
                            </DialogHeader>
                            <div className="grid grid-cols-2 gap-4 py-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">First Name</label>
                                    <Input value={name} onChange={(e) => dispatch(inputName(e.target.value))} placeholder="John" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Last Name</label>
                                    <Input value={surname} onChange={(e) => dispatch(inputSurname(e.target.value))} placeholder="Doe" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Age</label>
                                    <Input value={dataZ.age} onChange={(e) => dataZ.inputAge(e.target.value)} placeholder="28" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Job Title</label>
                                    <Input value={dataZ.job} onChange={(e) => dataZ.inputJob(e.target.value)} placeholder="Developer" />
                                </div>
                                <div className="space-y-2 col-span-2">
                                    <label className="text-sm font-medium">Address</label>
                                    <Input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="123 Main St" />
                                </div>
                                <div className="space-y-2 col-span-2">
                                    <label className="text-sm font-medium">Role</label>
                                    <Input value={role} onChange={(e) => setRole(e.target.value)} placeholder="Admin" />
                                </div>
                                <div className="col-span-2 mt-2 flex items-center space-x-2 bg-slate-50 p-3 rounded-md border">
                                    <Checkbox id="active-status" checked={status} onCheckedChange={(checked) => setStatus(checked as boolean)} />
                                    <label htmlFor="active-status" className="text-sm font-medium cursor-pointer">Active Status</label>
                                </div>
                            </div>
                            <DialogFooter>
                                <Button variant="outline" onClick={() => setAddModalOpen(false)}>Cancel</Button>
                                <Button onClick={handleAdd}>Save User</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>

                <Card className="shadow-sm border-slate-200">
                    <CardHeader className="bg-slate-50/50 border-b pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="space-y-1">
                            <CardTitle>Users List</CardTitle>
                        </div>
                        <div className="relative w-full sm:w-72">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
                            <Input className="pl-9 bg-white" placeholder="Search users by name..." value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                        </div>
                    </CardHeader>
                    <CardContent className="p-0 overflow-hidden">
                        <Table>
                            <TableHeader className="bg-slate-50/50">
                                <TableRow>
                                    <TableHead className="w-[250px]">User</TableHead>
                                    <TableHead>Age</TableHead>
                                    <TableHead>Job Title</TableHead>
                                    <TableHead className="max-w-[200px]">Address</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredData.length > 0 ? (
                                    filteredData.map((user: UserType) => (
                                        <TableRow key={user.id} className="hover:bg-slate-50/80">
                                            <TableCell>
                                                <div className="font-medium text-slate-900">{user.name} {user.surname}</div>
                                                {user.role && <div className="text-xs text-slate-500 mt-0.5">{user.role}</div>}
                                            </TableCell>
                                            <TableCell>{user.age || "—"}</TableCell>
                                            <TableCell>{user.job || "—"}</TableCell>
                                            <TableCell className="max-w-[200px] truncate text-slate-500">{user.address || "—"}</TableCell>
                                            <TableCell>
                                                <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium border ${user.status === true || user.status === 'true' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-slate-100 text-slate-600 border-slate-200'}`}>
                                                    <span className={`h-1.5 w-1.5 rounded-full ${user.status === true || user.status === 'true' ? 'bg-emerald-500' : 'bg-slate-400'}`}></span>
                                                    {user.status === true || user.status === 'true' ? 'Active' : 'Inactive'}
                                                </span>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Button variant="ghost" size="icon" onClick={() => handleEditClick(user)} className="h-8 w-8 text-slate-500">
                                                        <Edit2 className="h-4 w-4" />
                                                    </Button>
                                                    <Button variant="ghost" size="icon" onClick={() => handledelete(user.id)} className="h-8 w-8 text-slate-500 hover:text-red-600 hover:bg-red-50">
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={6} className="h-24 text-center text-slate-500">
                                            No users found.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
                    <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                            <DialogTitle>Edit User Profile</DialogTitle>
                        </DialogHeader>
                        <div className="grid grid-cols-2 gap-4 py-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">First Name</label>
                                <Input value={name} onChange={(e) => dispatch(inputName(e.target.value))} />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Last Name</label>
                                <Input value={surname} onChange={(e) => dispatch(inputSurname(e.target.value))} />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Age</label>
                                <Input value={dataZ.age} onChange={(e) => dataZ.inputAge(e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Job</label>
                                <Input value={dataZ.job} onChange={(e) => dataZ.inputJob(e.target.value)} />
                            </div>
                            <div className="space-y-2 col-span-2">
                                <label className="text-sm font-medium">Address</label>
                                <Input value={address} onChange={(e) => setAddress(e.target.value)} />
                            </div>
                            <div className="space-y-2 col-span-2">
                                <label className="text-sm font-medium">Role</label>
                                <Input value={role} onChange={(e) => setRole(e.target.value)} />
                            </div>
                            <div className="col-span-2 mt-2 flex items-center space-x-2 bg-slate-50 p-3 rounded-md border">
                                <Checkbox id="edit-active-status" checked={status} onCheckedChange={(checked) => setStatus(checked as boolean)} />
                                <label htmlFor="edit-active-status" className="text-sm font-medium cursor-pointer">Active Status</label>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setEditModalOpen(false)}>Cancel</Button>
                            <Button onClick={handleSaveEdit}>Save changes</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
})

export default CrudRZJ