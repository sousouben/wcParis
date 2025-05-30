import React from 'react';
    import { ListFilter, Search, X } from 'lucide-react';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { Label } from "@/components/ui/label";
    import { Checkbox } from "@/components/ui/checkbox";
    import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
    import {
      DropdownMenu,
      DropdownMenuContent,
      DropdownMenuLabel,
      DropdownMenuSeparator,
      DropdownMenuTrigger,
      DropdownMenuCheckboxItem
    } from "@/components/ui/dropdown-menu";

    const SearchAndFilterBar = ({ 
      t, 
      searchTerm, 
      handleSearchChange, 
      filterPMR, 
      setFilterPMR, 
      filterOpenNow, 
      setFilterOpenNow, 
      filterType, 
      setFilterType, 
      availableTypes, 
      resetFilters 
    }) => (
      <section className="glassmorphism p-4 sm:p-6 md:p-8 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
          <div className="relative flex-grow w-full">
            <Label htmlFor="search-input" className="text-slate-300 mb-1 block text-sm">{t('searchLabel')}</Label>
            <Search className="absolute left-3 bottom-2.5 text-slate-400" size={18} />
            <Input 
              id="search-input"
              type="text" 
              placeholder={t('searchPlaceholder')}
              className="pl-10 w-full bg-slate-700/50 border-slate-600 placeholder-slate-400 text-slate-50 focus:ring-sky-500 focus:border-sky-500 text-sm sm:text-base"
              value={searchTerm}
              onChange={handleSearchChange} 
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full sm:w-auto bg-sky-500 hover:bg-sky-600 text-white border-sky-500 hover:border-sky-600 flex items-center justify-center text-sm sm:text-base py-2.5">
                <ListFilter size={18} className="mr-2" />
                {t('filtersButton')}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64 bg-slate-800 border-slate-700 text-slate-200 p-4 space-y-3">
              <DropdownMenuLabel className="text-md font-semibold text-sky-300">{t('filterOptions')}</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-slate-700"/>
              
              <DropdownMenuCheckboxItem
                checked={filterPMR}
                onCheckedChange={setFilterPMR}
                className="flex items-center space-x-2 hover:bg-sky-700/30 focus:bg-sky-700/30"
              >
                 <Checkbox id="filter-pmr" checked={filterPMR} onCheckedChange={setFilterPMR} className="border-slate-500 data-[state=checked]:bg-sky-500"/>
                <Label htmlFor="filter-pmr" className="text-slate-200 cursor-pointer text-sm">{t('filterPmr')}</Label>
              </DropdownMenuCheckboxItem>

              <DropdownMenuCheckboxItem
                checked={filterOpenNow}
                onCheckedChange={setFilterOpenNow}
                className="flex items-center space-x-2 hover:bg-sky-700/30 focus:bg-sky-700/30"
              >
                <Checkbox id="filter-open" checked={filterOpenNow} onCheckedChange={setFilterOpenNow} className="border-slate-500 data-[state=checked]:bg-sky-500"/>
                <Label htmlFor="filter-open" className="text-slate-200 cursor-pointer text-sm">{t('filterOpenNow')}</Label>
              </DropdownMenuCheckboxItem>

              <div className="space-y-1">
                <Label htmlFor="filter-type" className="text-slate-300 text-sm">{t('filterTypeLabel')}</Label>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger id="filter-type" className="w-full bg-slate-700/80 border-slate-600 text-slate-50 focus:ring-sky-500 focus:border-sky-500 text-sm">
                    <SelectValue placeholder={t('filterTypePlaceholder')} />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700 text-slate-200">
                    {availableTypes.map(type => (
                      <SelectItem key={type} value={type} className="hover:bg-sky-700/30 focus:bg-sky-700/30 text-sm">
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={resetFilters} variant="ghost" className="w-full text-sky-400 hover:text-sky-300 hover:bg-sky-500/10 mt-2 text-sm">
                <X size={16} className="mr-2" />
                {t('resetFiltersButton')}
              </Button>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </section>
    );

    export default SearchAndFilterBar;