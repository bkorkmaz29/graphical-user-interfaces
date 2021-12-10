#ifndef entrydialog_H
#define entrydialog_H

#include <QDialog>

#include <QJsonArray>

#include "mainwindow.h"

namespace Ui {
    class entrydialog;
}

class entrydialog: public QDialog {
    Q_OBJECT

    public:

    explicit entrydialog(QWidget * parent);
    explicit entrydialog(QWidget * parent,
        const QString & user,
            const QJsonArray & code,
                const QJsonArray & activity,
                    const QJsonArray & entry,
                        const QJsonArray & accept,
                            const QJsonValue & froze,
                                const QString & date
    );
    ~entrydialog();

    signals:
    void newEntry();

    private slots:

    void on_pushButtonSave_clicked();
    bool isActive(const QString & code);
    void loadComboBox();
    bool exist(QJsonObject & obj, QJsonArray & array);

    void on_pushButtonCancel_clicked();

    private:
    Ui::entrydialog * ui;
    QString username;
    QJsonArray codeArr;
    QJsonArray activityArr;
    QJsonArray entryArr;
    QJsonValue frozen;
    QJsonArray acceptArr;
    QString myDate;
    int month;
    int year;
    QString reportDate;
};

#endif // entrydialog_H
