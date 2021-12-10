#ifndef PROJECTDIALOG_H
#define PROJECTDIALOG_H

#include <QDialog>

#include <QJsonArray>

#include "mainwindow.h"

namespace Ui {
   class projectdialog;
}

class projectdialog: public QDialog {
   Q_OBJECT

   public:
   explicit projectdialog(QWidget * parent,
      const QString & user,
         const QJsonArray & code,
            const QJsonArray & activity,
               const QJsonArray & entry,
                  const QJsonArray & accept,
                     const QJsonValue & froze,
                        const QString & date
                          );
   ~projectdialog();

   signals:
   void updateMenu();

   private slots:
   void on_pushButtonSubmit_clicked();
   bool exist(const QString & str, const QJsonArray & arr);

   void on_pushButtonCancel_clicked();

private:
   Ui::projectdialog * ui;
   QJsonArray codeArr;
   QJsonArray activityArr;
   QJsonArray entryArr;
   QJsonValue frozen;
   QJsonArray acceptArr;
   QString myDate;
   QString reportDate;
   QString username;
};

#endif // PROJECTDIALOG_H
