#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include <QMainWindow>

#include "menudialog.h"

#include "reportdialog.h"

#include "entrydialog.h"

#include "logindialog.h"

#include "qjsonmodel.h"

#include <QFile>

#include <QString>

#include <QStringList>

#include <QJsonArray>

#include <QJsonObject>

#include <QFileDialog>

#include <QMessageBox>

#include <QDir>

#include <QFile>

#include <QTextStream>

#include <QTableWidget>


QT_BEGIN_NAMESPACE
namespace Ui {
    class MainWindow;
}
QT_END_NAMESPACE

class MainWindow: public QMainWindow {
    Q_OBJECT

    public:
    MainWindow(QWidget * parent = nullptr);
    ~MainWindow();

    private:
        Ui::MainWindow * ui;
    QString myDate;
    QJsonArray codeArr;
    QJsonArray activityArr;
    QJsonValue frozen;
    QJsonArray entryArr;
    QJsonArray acceptArr;
    QDate currDate;
    QStringList monthList;
    QString reportDate;
    QString user;

    signals:

    void dialogClosed();

    private slots:
    void on_calendarWidget_clicked(const QDate & date);
    void MenuClicked();
    void loadProjects();
    void on_pushButtonAdd_clicked();
    void on_MenuButton_clicked();
    void loadTable();
    //void on_pushButtonDelete_clicked();
    void loadMonthData();
    QString totalHour(QJsonArray & arr);
    bool entryExist(QJsonObject & entry, QJsonArray & array);
    bool codeExist(QString code, QJsonArray & array);

};
#endif // MAINWINDOW_H
