
    import React from 'react';
    import {
      AlertDialog,
      AlertDialogAction,
      AlertDialogCancel,
      AlertDialogContent,
      AlertDialogDescription,
      AlertDialogFooter,
      AlertDialogHeader,
      AlertDialogTitle,
    } from "@/components/ui/alert-dialog";
    import { useTranslation } from '@/context/LanguageContext';

    const UpdatePrompt = ({ open, onConfirm, onCancel }) => {
      const { t } = useTranslation();

      if (!open) return null;

      return (
        <AlertDialog open={open} onOpenChange={(isOpen) => !isOpen && onCancel()}>
          <AlertDialogContent className="bg-slate-800 border-slate-700 text-slate-200">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-sky-300">{t('pwaUpdateTitle')}</AlertDialogTitle>
              <AlertDialogDescription className="text-slate-400">
                {t('pwaUpdateDescription')}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={onCancel} className="text-slate-300 hover:bg-slate-700 border-slate-600 hover:border-slate-500">
                {t('pwaUpdateCancel')}
              </AlertDialogCancel>
              <AlertDialogAction onClick={onConfirm} className="bg-sky-500 hover:bg-sky-600 text-white">
                {t('pwaUpdateConfirm')}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      );
    };

    export default UpdatePrompt;
  