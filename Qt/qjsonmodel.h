#ifndef QJSONMODEL_H
#define QJSONMODEL_H

#include <QAbstractItemModel>

#include <QJsonDocument>

#include <QJsonValue>

#include <QJsonArray>

#include <QJsonObject>

#include <QIcon>

class QJsonTreeItem {
    public:
    QJsonTreeItem(QJsonTreeItem * parent = nullptr);
    ~QJsonTreeItem();
    void appendChild(QJsonTreeItem * item);
    QJsonTreeItem * child(int row);
    QJsonTreeItem * parent();
    int childCount() const;
    int row() const;
    void setKey(const QString & key);
    void setValue(const QVariant & value);
    void setType(const QJsonValue::Type & type);
    QString key() const;
    QVariant value() const;
    QJsonValue::Type type() const;

    static QJsonTreeItem * load(const QJsonValue & value, QJsonTreeItem * parent = 0);

    protected:

    private:
    QString mKey;
    QVariant mValue;
    QJsonValue::Type mType;
    QList < QJsonTreeItem * > mChilds;
    QJsonTreeItem * mParent;
};

class QJsonModel: public QAbstractItemModel {
    Q_OBJECT
    public:
    explicit QJsonModel(QObject * parent = nullptr);
    QJsonModel(const QByteArray & json, QObject * parent = nullptr);
    ~QJsonModel();
    bool loadJson(const QByteArray & json);
    QVariant data(const QModelIndex & index, int role) const Q_DECL_OVERRIDE;
    QVariant headerData(int section, Qt::Orientation orientation, int role) const Q_DECL_OVERRIDE;
    QModelIndex index(int row, int column,
    const QModelIndex & parent = QModelIndex()) const Q_DECL_OVERRIDE;
    QModelIndex parent(const QModelIndex & index) const Q_DECL_OVERRIDE;
    int rowCount(const QModelIndex & parent = QModelIndex()) const Q_DECL_OVERRIDE;
    int columnCount(const QModelIndex & parent = QModelIndex()) const Q_DECL_OVERRIDE;

    private:
    QJsonTreeItem * mRootItem;
    QStringList mHeaders;
};

#endif // QJSONMODEL_H
