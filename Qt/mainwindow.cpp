#include "mainwindow.h"

#include "ui_mainwindow.h"

#include <QTableWidget>

#include <QDate>

#include <QTreeView>

MainWindow::MainWindow(QWidget * parent): QMainWindow(parent), ui(new Ui::MainWindow) {
    ui -> setupUi(this);
    logindialog * dialog = new logindialog(this);

    if (dialog -> exec() == QDialog::Accepted) {
        user = dialog -> logindialog::getUsername();
        ui -> labelUser -> setText("User: " + user);
    } else  {

    }

    setWindowTitle("TRS");
    myDate = QDate::currentDate().toString("yyyy-MM-dd");
    myDate += " ";
    reportDate = myDate.left(7);
    loadMonthData();
    loadProjects();

    ui -> treeView -> setEditTriggers(QAbstractItemView::NoEditTriggers);

    this -> setStyleSheet("background-color: #4E4E4E; color: white");

}

MainWindow::~MainWindow() {
    delete ui;
}

void MainWindow::MenuClicked() {
    menudialog * dialog = new menudialog(this, user, codeArr, activityArr, entryArr, acceptArr, frozen, myDate);
    connect(dialog, SIGNAL(updateMain()), this, SLOT(loadProjects()));
    dialog -> setModal(false);
    dialog -> show();
}

void MainWindow::loadProjects() {
    if (!(QDir("/home/bk/Code/EGUI21Z-Korkmaz-Baran/lab1/.json/activity").exists()))
        QDir("/home/bk/Code/EGUI21Z-Korkmaz-Baran/lab1/.json").mkdir("activity");

    QFile file("/home/bk/Code/EGUI21Z-Korkmaz-Baran/lab1/.json/activity/activity.json");

    if (!file.exists()) {
        QJsonObject data;

        data["activities "] = activityArr;

        QJsonObject entry;
        for (auto it = activityArr.begin(); it != activityArr.end(); it++) {
            entry = it -> toObject();
            codeArr.append(entry["code "].toString());
        }

        QJsonDocument document(data);
        QByteArray array = document.toJson();
        file.open(QFile::WriteOnly | QFile::Text);
        file.write(array);

    } else if (file.open(QFile::ReadOnly | QFile::Text)) {

        QString stringData = file.readAll();
        file.close();

        QJsonDocument document = QJsonDocument::fromJson(stringData.toUtf8());
        QJsonObject data = document.object();

        activityArr = data["activities "].toArray();

        QJsonObject entry;

        for (auto it = activityArr.begin(); it != activityArr.end(); it++) {
            entry = it -> toObject();
            QString code = entry["code "].toString();
            if (!codeExist(code, codeArr)) {
                codeArr.append(entry["code "].toString());
            }
        }
    } else {
        QMessageBox::warning(this, "Error", "File could not be opened.");
    }
    loadTable();
}

void MainWindow::loadMonthData() {

    if (!(QDir("/home/bk/Code/EGUI21Z-Korkmaz-Baran/lab1/.json/" + user).exists()))
        QDir("/home/bk/Code/EGUI21Z-Korkmaz-Baran/lab1/.json").mkdir(user);

    QFile file("/home/bk/Code/EGUI21Z-Korkmaz-Baran/lab1/.json/" + user + "/" + user + "-" + reportDate + ".json");
    if (!file.exists()) {
        for (int i = 0; i <= entryArr.count(); i++) {
            entryArr.removeAt(0);
        }

        frozen = "False ";

        QJsonObject data;
        data["frozen "] = frozen;

        data["entries "] = entryArr;
        data["accepted "] = acceptArr;

        QJsonDocument document(data);
        QByteArray array = document.toJson();
        file.open(QFile::WriteOnly | QFile::Text);
        file.write(array);
        file.close();

    }
    if (file.open(QFile::ReadOnly | QFile::Text)) {
        QString stringData = file.readAll();
        file.close();

        QJsonDocument document = QJsonDocument::fromJson(stringData.toUtf8());
        QJsonObject data = document.object();

        frozen = data["frozen "].toString();

        entryArr = data["entries "].toArray();
        acceptArr = data["accepted "].toArray();
    } else {
        QMessageBox::warning(this, "Error", "Can not open file");
        return;
    }
    loadTable();
}

void MainWindow::on_calendarWidget_clicked(const QDate & date) {

    if (currDate.month() == date.month() & currDate.year() == date.year()) {
        currDate = date;
        myDate = date.toString("yyyy-MM-dd");
        myDate += " ";
        reportDate = myDate.left(7);
        loadMonthData();
    } else {
        currDate = date;
        myDate = date.toString("yyyy-MM-dd");
        myDate += " ";
        reportDate = myDate.left(7);
        loadMonthData();
    }

}

void MainWindow::loadTable() {

    QJsonModel * model = new QJsonModel;
    QJsonArray entriesAtDate;
    QJsonObject entry;
    for (auto it = entryArr.begin(); it != entryArr.end(); it++) {
        entry = it -> toObject();
        if (entry["date "].toString() == myDate && !(entryExist(entry, entriesAtDate))) {
            entry = it -> toObject();
            entriesAtDate.append(entry);
        }
    }
    ui -> labelSpent -> setText("Total time spent at " + myDate + " =   " + totalHour(entriesAtDate) + " hours");

    QJsonDocument document;
    document.setArray(entriesAtDate);

    QString dataToString(document.toJson());

    ui -> treeView -> setModel(model);
    model -> loadJson(dataToString.toUtf8());
    ui -> treeView -> setColumnWidth(0, 400);
    ui -> treeView -> show();

}

void MainWindow::on_pushButtonAdd_clicked() {
    //loadProjects();
    entrydialog * dialog = new entrydialog(this, user, codeArr, activityArr, entryArr, acceptArr, frozen, myDate);
    connect(dialog, SIGNAL(newEntry()), this, SLOT(loadMonthData()));
    dialog -> exec();

}

void MainWindow::on_MenuButton_clicked() {
    menudialog * dialog = new menudialog(this, user, codeArr, activityArr, entryArr, acceptArr, frozen, myDate);
    connect(dialog, SIGNAL(updateMain()), this, SLOT(loadProjects()));
    dialog -> open();

}

//void MainWindow::on_pushButtonDelete_clicked() {}

QString MainWindow::totalHour(QJsonArray & arr) {

    int total = 0;

    QJsonObject entry;
    for (auto it = arr.begin(); it != arr.end(); it++) {
        entry = it -> toObject();
        total = total + entry["time "].toInt();
    }
    return QString::number(total);
}

bool MainWindow::entryExist(QJsonObject & entry, QJsonArray & array) {

    QJsonObject currEntry;
    for (auto it = array.begin(); it != array.end(); it++) {
        currEntry = it -> toObject();
        if (currEntry["code "].toString() == entry["code "].toString() &
            currEntry["subcode "].toString() == entry["subcode "].toString() &
            currEntry["description "].toString() == entry["description "].toString()) {
            return true;
        }
    }
    return false;
}

bool MainWindow::codeExist(QString code, QJsonArray & array) {

    QString currCode;
    for (auto it = array.begin(); it != array.end(); it++) {
        currCode = it -> toString();
        if (currCode == code) {
            return true;
        }
    }
    return false;

}
