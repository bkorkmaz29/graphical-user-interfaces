#ifndef REPORTDIALOG_H
#define REPORTDIALOG_H

#include <QDialog>

#include "menudialog.h"

namespace Ui {
    class reportdialog;
}

class reportdialog: public QDialog {
    Q_OBJECT

    public:
    explicit reportdialog(QWidget * parent,const QString & user);

    ~reportdialog();

    private slots:
    void on_pushButtonExit_clicked();
    void loadMonthData();
    void loadTable(QString & document);
    void loadMonthBox();

    void on_pushButton_clicked();

    void on_pushButtonSubmit_clicked();

    private:
    Ui::reportdialog * ui;
    QString username;
    QJsonArray codeArr;
    QJsonArray activityArr;
    QJsonArray entryArr;
    QJsonValue frozen;
    QJsonArray acceptArr;
    QString reportDate;
};

#endif // REPORTDIALOG_H
