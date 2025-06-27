
import { type ColumnDef} from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Button } from "../../..//components/ui/button"
import type { Snippet } from "../types"
import { Badge } from "../../../components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu"
import { useNavigate } from "react-router-dom"

export const createColumns = (): ColumnDef<Snippet>[] => {
    const navigate = useNavigate()
return [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="capitalize max-w-[50ch] truncate">{row.getValue("title")}</div>
    ),
  },
  {
    accessorKey: "language",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Language
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => (
      <Badge variant="secondary" className="capitalize max-w-[20ch] truncate xs">{row.getValue('language')}</Badge>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
        const description : string = row.getValue("description") 
        console.log(description)
        if (!description || description.length === 0) {
            return <div className="text-muted-foreground">No description</div>
        }
        return <div className="text-left font-medium max-w-[50ch] truncate">{description}</div>
    },
  },
  {
    accessorKey: "updatedAt",
     header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Last Updated
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => {
        const updatedAt = row.getValue('updatedAt')
        const createdAt = row.original.createdAt
        const dateValue = String(updatedAt ?? createdAt)

        if (!dateValue || typeof dateValue === 'object') 
            return <div className="text-right font-medium">-</div>

        const date = new Date(dateValue).toISOString()
        const formatted = date.split('T')[0]
         return <div className="text-left font-medium">{formatted}</div>
    },
  },
  {
  accessorKey: "tags",
  header: "Tags",
  cell: ({ row }) => {
    const tags = row.getValue("tags")
    if (!tags || !Array.isArray(tags) || tags.length === 0) {
      return <div className="text-muted-foreground">No tags</div>
    }
    return (
      <div className="flex gap-1 flex-wrap max-w-[50ch]">
        {tags.slice(0, 3).map((tag, index) => (
          <Badge key={index} variant="secondary" className="text-xs">
            {tag}
          </Badge>
        ))}
        {tags.length > 3 && (
          <Badge variant="outline" className="text-xs">
            +{tags.length - 3}
          </Badge>
        )}
      </div>
    )
  },
},
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const snippet = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => navigate(`/snippets/${snippet.id}`)}
            >
              Open snippet
            </DropdownMenuItem>
            <DropdownMenuItem>Edit snippet</DropdownMenuItem>
            <DropdownMenuItem className="text-red-500">Delete snippet</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
}